const axios = require("axios");

const handler = async (req, res) => {
  try {
    const result = await axios.get("https://symbol-search.tradingview.com/symbol_search/", {
      params: {
        exchange: "",
        type: "stock",
        hl: true,
        lang: "ko",
        domain: "production",
        ...req.query,
      },
    });
    const data = result.data.map((item) => {
      return {
        ticker: item.symbol.replace(/<\/?em>/g, ""),
        name: item.description.replace(/<\/?em>/g, ""),
        exchange: item.exchange,
        country: item.country,
      };
    });
    res.json(data);
  } catch (err) {
    res.status(500);
    res.json({
      message: "server error",
      detail: String(err),
    });
  }
};

module.exports = handler;
