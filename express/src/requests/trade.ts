import { Dapp, ethers, Network } from "@dhedge/v2-sdk";
import { Router } from "express";

const tradeRouter = Router();
import { Request, Response } from "express";
import { getBalanceFromComposition } from "../utils/pool";
import { getTxOptions } from "../utils/txOptions";
import { dhedge } from "../dhedge";

tradeRouter.post("/approve", async (req: Request, res: Response) => {
  try {
    let network = Network.POLYGON;
    if (req.query.network) network = req.query.network as Network;
    const poolAddress = req.query.pool as string;
    const pool = await dhedge(network).loadPool(poolAddress);
    const txOptions = await getTxOptions(pool.network);
    let dApp = Dapp.1inch;
    if (req.query.platform) dApp = req.query.platform as Dapp;
    const tx = await pool.approve(
      dApp,
      req.body.asset,
      ethers.constants.MaxUint256,
      txOptions
    );
    res.status(200).send({ status: "success", msg: tx.hash });
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err });
  }
});

//use get request as some
tradeRouter.get("/trade", async (req: Request, res: Response) => {
  try {
    let network = Network.POLYGON;
    if (req.query.network) network = req.query.network as Network;
    const assetA = req.query.from as string;
    const assetB = req.query.to as string;
    const share = req.query.share as string;
    const amount = req.query.amount as string;
    const slippage = req.query.slippage as string;
    const poolAddress = req.query.pool as string;

    const pool = await dhedge(network).loadPool(poolAddress);

    let tradeAmount: ethers.BigNumber;
    const composition = await pool.getComposition();
    const balance = getBalanceFromComposition(assetA, composition);
    if (share) {
      tradeAmount = balance.mul(share).div(100);
    } else if (amount) {
      tradeAmount = ethers.BigNumber.from(amount);
      if (tradeAmount.gt(balance)) tradeAmount === balance;
    } else {
      throw "share or amount missing";
    }

    const txOptions = await getTxOptions(pool.network);

    let dApp = Dapp.1inch;
    let feeAmount = 500;
    if (req.query.feeAmount)
      feeAmount = req.query.feeAmount as unknown as number;
    if (req.query.platform) dApp = req.query.platform as Dapp;
    let tx;
    if (dApp === Dapp.UNISWAPV3) {
      tx = await pool.tradeUniswapV3(
        assetA,
        assetB,
        tradeAmount,
        feeAmount,
        +slippage,
        txOptions
      );
    } else {
      tx = await pool.trade(
        dApp,
        assetA,
        assetB,
        tradeAmount,
        +slippage,
        txOptions
      );
    }

    res.status(200).send({ status: "success", msg: tx.hash });
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err });
  }
});

export default tradeRouter;
