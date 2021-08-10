# Express

API endpoints to mangage and trade pools on Polygon/Sushiswap, built with Express.

## Initial setup

Clone this repo, navigate to the express folder and run `yarn install` or `npm install`

Create an .env file with two paramaters (If you don't have an Infura project, set one up for free [here](https://infura.io/)

`PRIVATE_KEY=YOUR_PRIVATE_KEY INFURA_PROJECT_ID=YOUR_INFURA_PROJECT_ID`

If you already have a pool which you want to trade, change the pool address in the config.ts file.

Run `yarn start:watch` or `npm run start:watch` to spin up server locally.

## API enpoints

### Create pool

Create a new pool on Polygon mainnet.

**URL** : `/createPool/`

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

### Error Response

**Code** : `400 Bad Request`

**Content example**

```json
{
  "status": "fail",
  "msg": "Error..."
}
```
