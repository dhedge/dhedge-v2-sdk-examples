import { Dhedge, Network } from "@dhedge/v2-sdk";
import { wallet } from "./wallet";

export const dhedge = (network: Network): Dhedge =>
  new Dhedge(wallet(network), network);
