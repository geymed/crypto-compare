import {
  CoinDiff,
  calculatePriceDiffPercentsAndSort
} from "../../src/logic/compare-coins";

describe("compare coins", () => {
  it("compare and coin diffs correctly", () => {
    expect(
      calculatePriceDiffPercentsAndSort([
        { symbol: "BTC", currentValue: 1, oldValue: 0.5 },
        { symbol: "ETH", currentValue: 3, oldValue: 1 }
      ])
    ).toEqual([
      {
        symbol: "ETH",
        priceDiffPercents: 200
      },
      {
        symbol: "BTC",
        priceDiffPercents: 100
      }
    ]);
  });
  it("sorts the results by performance", () => {
    const res = calculatePriceDiffPercentsAndSort([
      { symbol: "BTC", currentValue: 1, oldValue: 0.5 },
      { symbol: "ETH", currentValue: 1, oldValue: 0.7 }
    ]);
    expect(res[0].priceDiffPercents).toBeGreaterThan(res[1].priceDiffPercents);
  });
});
