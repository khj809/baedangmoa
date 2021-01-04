import { writable } from "svelte/store";

interface CurrencyExchange {
  USD: number;
  KRW: number;
}

const exchangeRates = writable<CurrencyExchange>(null);

export { exchangeRates };
