# Express

API endpoints to manage and trade pools on Polygon/Sushiswap, built with Express.

## Initial setup

Clone this repo, navigate to the express folder and run `yarn install` or `npm install`.

Create an .env file with two paramaters. (If you don't have an Infura project, set up one for free [here](https://infura.io/).)

If you want to use 1Inch to trade pool assets you need to apply for an API key at [1Inch Dev Portal](https://docs.1inch.io/docs/aggregation-protocol/introduction).
Then you need to set the API key in the .env file.

```
PRIVATE_KEY=YOUR_PRIVATE_KEY
INFURA_PROJECT_ID=YOUR_INFURA_PROJECT_ID
ONEINCH_API_KEY=YOUR_API_KEY_FROM_1INCH
```

If you already have a pool which you want to trade, change the pool address in the config.ts file.

Run `yarn start:watch` or `npm run start:watch` to spin up local server.

## API enpoints

### Create pool

Create a new pool on Polygon mainnet.

**URL** : `/createPool`

**Method** : `PUT`

**Data Example**

```json
{
  "managerName": "Day Ralio",
  "poolName": "Awesome Pool",
  "supportedAssets": [
    ["0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", true],
    ["0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619", false]
  ],
  "fee": 20
}
```

#### Success Responses

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "msg": "0x23a773bf588FF1271153180AdCdBba853f1C7BAC"
}
```

### Get pool composition

**URL** : `/poolComposition`

**Method** : `GET`

#### Success Responses

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "msg": [
    {
      "asset": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "isDeposit": true,
      "balance": {
        "type": "BigNumber",
        "hex": "0x297761"
      },
      "rate": {
        "type": "BigNumber",
        "hex": "0x0de057f35b7f7800"
      }
    },
    {
      "asset": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "isDeposit": false,
      "balance": {
        "type": "BigNumber",
        "hex": "0x0348a94ca3f71a"
      },
      "rate": {
        "type": "BigNumber",
        "hex": "0xaa9dd6d0c8b26c0000"
      }
    }
  ]
}
```

### Change pool assets

Enable new assets/remove assets

**URL** : `/changeAssets`

**Method** : `PUT`

**Data Example**

```json
{
  "assets": [
    {
      "asset": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
      "isDeposit": true
    },
    {
      "asset": "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
      "isDeposit": false
    }
  ]
}
```

#### Success Responses

**Code** : `200 OK`

**Content example**

```json
{
  "status": "success",
  "msg": "0xa82b484a881a7642230799a88948e7b7c89df7c8a6a8ab18c793a66a25e9d2fb"
}
```

### Approve assets to trade

**URL** : `/approve`

**Method** : `PUT`

**Data Example**

```json
{ "asset": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" }
```

#### Success Responses

**Code** : `200 OK`

### Trade assets

**URL** : `/trade`

**Method** : `GET`

**Query Parameters**

`from` - Asset to trade from

`to` - Asset to trade into

`share` - Percentage of balance to trade

`slippage` - Slippage tolerance in %

`platform` - Platform like "1inch" or "uniswapV3"

`feeAmount` - Only for UniV3 trades (default 500 (0.05%))

**Url Example**

Trade 50% of your USDC to WETH

`http://localhost:8000/trade?from=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&to=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&share=50&slippage=0.5`

#### Success Responses

**Code** : `200 OK`

### Pools on Optimism

For trading/managing pools on Optimism pass an additional query parameter to the above endpoints

`network=optimism`

For trading/approving assets on other platforms than 1Inch pass an additional query parameter

e.g. Toros tokens
`platform=toros`
