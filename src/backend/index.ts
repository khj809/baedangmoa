import express from "express";
import App from "~/frontend/App.svelte";
import symbolSearch from "@api/symbol_search";

require("dotenv").config();

const app = express();
app.get("/api/symbol_search", symbolSearch);

const port = 5001;
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
