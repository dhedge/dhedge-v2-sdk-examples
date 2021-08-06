import express from "express"
import adminRouter from "./requests/admin"
import investRouter from "./requests/invest"
import tradeRouter from "./requests/trade"

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(adminRouter)
app.use(investRouter)
app.use(tradeRouter)
app.listen(process.env.PORT || 8000, () => {
  console.log(`⚡️[server]: Server is running...`)
})
