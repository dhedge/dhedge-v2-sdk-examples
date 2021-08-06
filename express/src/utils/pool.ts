import { ethers, FundComposition } from "@dhedge/v2-sdk"

export const getBalanceFromComposition = (
    asset: string,
    composition: FundComposition[]
  ): ethers.BigNumber => {
    return composition.find((x) => x.asset.toLowerCase() === asset.toLowerCase())!
      .balance
  }