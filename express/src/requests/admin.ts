import { Dhedge, Network, SupportedAsset } from "@dhedge/v2-sdk"
import { Router } from "express"
import { wallet } from "../wallet"

const adminRouter = Router()
import { Request, Response } from "express"
import { poolAddress } from "../config"

const dhedge = new Dhedge(wallet, Network.POLYGON)

adminRouter.post("/createPool", async (req: Request, res: Response) => {
  try {
    const pool = await dhedge.createPool(
      req.body.managerName,
      req.body.poolName,
      req.body.symbol,
      req.body.supportedAssets as unknown as SupportedAsset[],
      Number(req.body.fee)
    )
    res.status(200).send({
      status: "success",
      msg: pool.address,
    })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

adminRouter.get("/poolComposition", async (req: Request, res: Response) => {
  try {
    const pool = await dhedge.loadPool(poolAddress)
    const compsoition = await pool.getComposition()
    res.status(200).send({ status: "success", msg: compsoition })
  } catch (err) {
    res.status(400).send({ status: "fail", msg: err })
  }
})

adminRouter.post("/changeAssets", async (req: Request, res: Response) => {
    try {
      const pool = await dhedge.loadPool(poolAddress)
      const tx = await pool.changeAssets(req.body.assets)
      res.status(200).send({ status: "success", msg: tx.hash })
    } catch (err) {
      res.status(400).send({ status: "fail", msg: err })
    }
  })

export default adminRouter
