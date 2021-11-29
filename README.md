# Crypto Compare
## Overview

A server that accepts a list of coins and a date in the past and returns the price (in USD$) difference in percentage between that time and now, sorted from best performing coin to worst.
E.g. the user sends this list: `BTC, ETH, BNB, DOGE`
And the date `01/01/2020`
The system will return: `DOGE: 3010%, BTC: 200%, ETH: 50%, BNB: -10%`

## Getting Started
 - Make sure you have [yarn](https://yarnpkg.com/getting-started/install) installed.
 - execute `yarn install && yarn build`
 - execute `yarn start` to start the server
 ## API reference
 
 ### Local usage

 call `http://localhost:8080/coin-compare`
 with the following request parameters:
  - coinsyms: list of coin symbols comma-sepaerated (e.g. `BTC,ETH,BNB`)
  - date: `DD-MM-YYYY` formated date (e.g. `17-02-2020`)

 ```
 GET http://localhost:8080/coin-compare?coinsyms=BTC,ETH,BNB&date=17-02-2020
 ```

 ### result format
 A json array of objects with `symbol` and `priceDiffPercents` fields sorted by highest to lowest `priceDiffPercents` for example:
 ```json 
 [
  {
    "symbol": "SOL",
    "priceDiffPercents": 9648.105672742164
  },
  {
    "symbol": "ETH",
    "priceDiffPercents": 745.4898575744496
  },
  {
    "symbol": "BTC",
    "priceDiffPercents": 206.00000000000006
  }
]
```
 
## Still missing:
 - [ ] routes tests
 - [ ] integraton tests
 - [ ] Better error handling
 - [ ] Caching known past results with [node-lru-cache](https://github.com/isaacs/node-lru-cache)
 - [ ] default route handling
 - [ ] much more...
