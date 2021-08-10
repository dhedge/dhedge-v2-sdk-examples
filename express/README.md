# Express

API endpoints to manage and trade pools on Polygon/Sushiswap, built with Express.

## Initial setup

Clone this repo, navigate to the express folder and run `yarn install` or `npm install`.

Create an .env file with two paramaters. (If you don't have an Infura project, set one up for free [here](https://infura.io/).)

```
PRIVATE_KEY=YOUR_PRIVATE_KEY INFURA_PROJECT_ID=YOUR_INFURA_PROJECT_ID
```

If you already have a pool which you want to trade, change the pool address in the config.ts file.

Run `yarn start:watch` or `npm run start:watch` to spin up server locally.

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
`share` - Percentage of balanc to

**Url Example**

Trade 50% of your USDC to WETH

`http://localhost:8000/trade?from=0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174&to=0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619&share=50`

#### Success Responses

**Code** : `200 OK`
