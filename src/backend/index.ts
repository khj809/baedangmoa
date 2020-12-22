import express from "express";
require("dotenv").config();

const app = express();
app.get("/api/symbol_search", require("./api/symbol_search"));

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`);
});
