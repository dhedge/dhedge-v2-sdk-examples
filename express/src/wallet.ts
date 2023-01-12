import { ethers, Network } from "@dhedge/v2-sdk";

require("dotenv").config();

export const wallet = (network: Network): ethers.Wallet => {
  let url;
  switch (network) {
    case "polygon":
      url = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
      break;
    case "optimism":
      url = `https://optimism-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
      break;
    default:
      throw Error("network not supported");
  }

  return new ethers.Wallet(
    process.env.PRIVATE_KEY as string,
    new ethers.providers.JsonRpcProvider(url)
  );
};
