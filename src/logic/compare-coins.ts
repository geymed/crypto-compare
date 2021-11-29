import _ from "lodash";

export type CoinDiff = {
  symbol: string;
  currentValue: number;
  oldValue: number;
};

export type CoinCompareResult = {
  symbol: string;
  priceDiffPercents: number;
};

export const calculatePriceDiffPercentsAndSort = (
  coinDiffs: CoinDiff[]
): CoinCompareResult[] => {
  const result: CoinCompareResult[] = coinDiffs.map(coinDiff => {
    const priceDiffPercents =
      ((coinDiff.currentValue - coinDiff.oldValue) / coinDiff.oldValue) * 100;
    return {
      symbol: coinDiff.symbol,
      priceDiffPercents
    };
  });

  return _.orderBy(result, "priceDiffPercents", "desc");
};
