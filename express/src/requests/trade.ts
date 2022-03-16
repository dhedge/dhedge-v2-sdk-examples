import { Dapp, Dhedge, ethers, Network } from "@dhedge/v2-sdk"
import { Router } from "express"
import { wallet } from "../wallet"

const tradeRouter = Router()
import { Request, Response } from "express"
import { poolAddress } from "../config"
import { getBalanceFromComposition } from "../utils/pool"
import { getTxOptions } from "../utils/txOptions"

const dhedge = new Dhedge(wallet, Network.POLYGON)

tradeRouter.post("/approve", async (req: Request, res: Response) => {
  try {
    const pool = await dhedge.loadPool(poolAddress)
    const txOptions = await getTxOptions()
    const tx = await pool.approve(
      Dapp.ONEINCH,
      req.body.asset,
      ethers.constants.MaxUint256,
      txOptions
    )
    res.status(200).send({ status: "success", msg: tx.hash })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

//use get request as some
tradeRouter.get("/trade", async (req: Request, res: Response) => {
  try {
    const assetA = req.query.from as string
    const assetB = req.query.to as string
    const share = req.query.share as string
    const slippage = req.query.slippage as string

    const pool = await dhedge.loadPool(poolAddress)
    const composition = await pool.getComposition()
    const balance = getBalanceFromComposition(assetA, composition)
    const tradeAmount = balance.mul(share).div(100)

    const txOptions = await getTxOptions()

    const tx = await pool.trade(Dapp.ONEINCH, assetA, assetB, tradeAmount, +slippage, txOptions)

    res.status(200).send({ status: "success", msg: tx.hash })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

export default tradeRouter
