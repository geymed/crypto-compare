/* eslint-ignore @typescript-eslint/camelcase */
import _ from "lodash";
import express from "express";
import axios from "axios";
import moment from "moment";
import { calculatePriceDiffPercentsAndSort } from "../logic/compare-coins";

const PRICE_API_BASE_URL = "https://min-api.cryptocompare.com/data/price";
const HISTORICAL_API_BASE_URL =
  "https://min-api.cryptocompare.com/data/pricehistorical";

type PriceAPIRes = {
  data: Record<string, number>;
};

type HistoricalAPIRes = {
  data: {
    USD: Record<string, number>;
  };
};
/**
/**
 * Query params:
  coinsyms: list of coin symbols comma-sepaerated (e.g. BTC,ETH,BNB)
  date: DD-MM-YYYY formated date (e.g. 17-02-2020)
 */

export const handler = async (req: express.Request, res: express.Response) => {
  try {
    const { coinsyms, date } = req.query;
    const dateMoment = moment(date.toString(), "DD-MM-YYYY");

    const currentPricesRes = await axios.get<unknown, PriceAPIRes>(
      `${PRICE_API_BASE_URL}`,
      {
        params: {
          fsym: "USD",
          tsyms: coinsyms.toString(),
          api_key: process.env.CRYPTO_COMPARE_API_KEY
        }
      }
    );

    console.log("new prices", currentPricesRes.data);
    const oldPricesRes = await axios.get<unknown, HistoricalAPIRes>(
      `${HISTORICAL_API_BASE_URL}`,
      {
        params: {
          fsym: "USD",
          tsyms: coinsyms.toString(),
          ts: dateMoment.unix(),
          api_key: process.env.CRYPTO_COMPARE_API_KEY
        }
      }
    );

    console.log("old prices", oldPricesRes.data);

    const oldPrices = oldPricesRes.data;
    const currentPrices = currentPricesRes.data;
    const coinsWithData = _.intersection(
      Object.keys(oldPrices.USD),
      Object.keys(currentPrices)
    );
    const diffs = coinsWithData.map(symbol => ({
      symbol,
      currentValue: 1 / currentPrices[symbol],
      oldValue: 1 / oldPrices.USD[symbol]
    }));
    const result = calculatePriceDiffPercentsAndSort(diffs);
    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
