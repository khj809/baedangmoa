import { writable } from "svelte/store";

interface CurrencyExchange {
  USD: number;
  KRW: number;
  [currency: string]: number;
}

const exchangeRates = writable<CurrencyExchange>(null);

export { exchangeRates };
