import { ethers } from "@dhedge/v2-sdk"
import { infuraProjectId, privateKey } from "./secrets"

const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mainnet.infura.io/v3/${infuraProjectId}`
)

export const wallet = new ethers.Wallet(privateKey, provider)
