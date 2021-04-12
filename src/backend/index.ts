const express = require("express");
const symbolSearch = require("@api/symbol_search");
const exchangeRates = require('@api/exchange_rates');

require("dotenv").config();

const app = express();
app.get("/api/symbol_search", symbolSearch);
app.get('/api/exchange_rates', exchangeRates);

const port = 5001;
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
