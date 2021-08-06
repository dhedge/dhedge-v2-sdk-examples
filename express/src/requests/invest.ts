import { Dhedge, ethers, Network } from "@dhedge/v2-sdk"
import { Router } from "express"
import { wallet } from "../wallet"

const investRouter = Router()
import { Request, Response } from "express"
import { poolAddress } from "../config"

const dhedge = new Dhedge(wallet, Network.POLYGON)

investRouter.post("/approveDeposit", async (req: Request, res: Response) => {
  try {
    const pool = await dhedge.loadPool(poolAddress)
    const tx = await pool.approveDeposit(
      req.body.asset,
      ethers.constants.MaxUint256
    )
    res.status(200).send({ status: "success", msg: tx.hash })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

investRouter.post("/deposit", async (req: Request, res: Response) => {
  try {
    const pool = await dhedge.loadPool(poolAddress)
    const tx = await pool.deposit(req.body.asset, req.body.amount)
    res.status(200).send({ status: "success", msg: tx.hash })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

export default investRouter
