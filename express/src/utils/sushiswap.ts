import { ethers } from "@dhedge/v2-sdk"
import {
  ChainId,
  Token,
  TokenAmount,
  Pair,
  TradeType,
  Route,
  Trade,
  Percent,
} from "@sushiswap/sdk"

export const getMinAmountOut = (
  assetA: string,
  assetB: string,
  reserveA: ethers.BigNumber,
  reserveB: ethers.BigNumber,
  amount: ethers.BigNumber | string,
  slippage: number = 0.5
): ethers.BigNumber => {
  const tokenA = new Token(ChainId.MATIC, assetA, 18)
  const tokenB = new Token(ChainId.MATIC, assetB, 18)
  const pair = new Pair(
    new TokenAmount(tokenA, reserveA.toString()),
    new TokenAmount(tokenB, reserveB.toString())
  )
  const route = new Route([pair], tokenA, tokenB)

  const trade = new Trade(
    route,
    new TokenAmount(tokenA, amount.toString()),
    TradeType.EXACT_INPUT
  )
  return ethers.BigNumber.from(
    trade
      .minimumAmountOut(new Percent((slippage * 100).toFixed(), "10000"))
      .raw.toString()
  )
}
