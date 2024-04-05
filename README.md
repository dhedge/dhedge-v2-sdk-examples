# dhedge-v2-sdk-examples

Example code using the [dHedge V2 SDK](https://www.npmjs.com/package/@dhedge/v2-sdk).

## Initial Setup 

Clone this repo, navigate to the 'express' folder and run 'yarn install' or 'npm install'.

Create an .env file in the directory with two paramaters. (If you don't have an Infura project, set up one for free [here](https://app.infura.io/register).)

If you want to use 1Inch to trade pool assets you need to apply for an API key at 1Inch Dev Portal. Then you need to set the API key in the .env file.

PRIVATE_KEY=YOUR_PRIVATE_KEY
INFURA_PROJECT_ID=YOUR_INFURA_PROJECT_ID
ONEINCH_API_KEY=YOUR_API_KEY_FROM_1INCH

If you already have a pool which you want to trade, change the pool address in the config.ts file.
Run 'yarn start:watch' or 'npm run start:watch' to spin up local server.

## dHEDGE Setup
1. Establish 2 Polygon Mainnet accounts within any of the acceptable wallet providers that can connect to dHEDGE dApp: 

  1. Manager Wallet
  2. Trader Wallet

2. Fund BOTH wallets with MATIC on the Polygon Mainnet:
  Deposit Polygon mainnet MATIC to both wallets to fund transaction fees.
  Go to Polygon bridge and bridge Ethereum mainnet MATIC to the Polygon Mainnet if necessary.
  MATIC Bridge: https://wallet.Polygon.technology/bridge.

3. Create a vault on the Polygon Mainnet in the dHEDGE web app https://app.dhedge.org/ while connected with the Manager Wallet (you need MATIC on Polygon Mainnet in the Manager Wallet for gas to pay for this transaction of creating a vault).

  After creating the vault, and still connected to the dHEDGE app, use the ‘Set Trader’ button to set the Trader to your Trader Account wallet address.

    Note: The Manager Wallet and Trader Wallet will both need to have MATIC for gas, you will be unable to do any transactions from either if not. All gas fees are paid out of Trader and Manager Wallets, not with any funds of the vaults. 

4. Use the Private Key to your Trader Wallet as the input to the .env SDK variable in order to initiate trades from that wallet as the trader. 

5. Enable the Mainnet Add-on “Polygon PoS BETA” in the project settings of your Infura account (a hybrid Plasma Proof-of-Stake sidechain to Ethereum’s mainnet which utilizes a Tendermint consensus validator layer and a Plasma sidechain for block production).

    You'll need to enable this in your account in order for your Infura project parameters to work within the .env file in this repo. 

6. Approve assets to trade with  in order to be able to trade the assets of the Vault under Trader private key through the /approve .post method using https://reqbin.com/ 

  Polygon Asset contract list example:

      WETH: 0x7ceb23fd6bc0add59e62ac25578270cff1b9f619
   
      USDC: 0x2791bca1f2de4661ed88a30c99a7a9449aa84174
   
      AAVE: 0xd6df932a45c0f255f85145f286ea0b292b21c90b
   
      LINK: 0x53e0bca35ec356bd5dddfebbd1fc0fd03fabad39
   
      SNX: 0x50b728d8d964fd00c2d0aad81718b71311fef68a
   
      SUSHI: 0x0b3f868e0be5597d5db7feb59e1cadbb0fdda50a
   
      WBTC: 0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6
   
      WMATIC: 0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270
   
      SOL: 0x7dff46370e9ea5f0bad3c4e29711ad50062ea7a4
	
Initiate Trades
