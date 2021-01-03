import { writable, derived } from "svelte/store";

type Currency = "USD" | "KRW";
interface CurrencyExchange {
  USD: number;
  KRW: number;
}

const exchangeRates = writable<CurrencyExchange>(null);

const getConvertedExchangeRates = (baseCurrency: Currency) =>
  derived(exchangeRates, ($exchangeRates) => {
    return !!$exchangeRates
      ? Object.keys($exchangeRates).reduce((acc, currency) => {
          acc[currency] = $exchangeRates[currency] / $exchangeRates[baseCurrency];
          return acc;
        }, {})
      : null;
  });

export { exchangeRates, getConvertedExchangeRates };
