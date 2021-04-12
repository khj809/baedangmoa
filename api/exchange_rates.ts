var axios = require("axios");
var convert = require('xml-js');

interface ExchangeRate {
  [currency: string]: number;
}

var handler = async (req, res) => {
  try {
    const result = await axios.get("https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");
    const data = convert.xml2js(result.data, {compact:true, spaces: 4})['gesmes:Envelope'].Cube.Cube.Cube;

    let rates: ExchangeRate = data.reduce((acc, cur) => {
      const {currency, rate} = cur['_attributes'];
      acc[currency] = rate;
      return acc;
    }, {});
    const usd = rates['USD'];
    rates = Object.entries(rates).reduce((acc, [currency, rate]) => {
      acc[currency] = Math.round(rate / usd * 100) / 100;
      return acc;
    }, {});

    res.json(rates);
  } catch (err) {
    res.status(500);
    res.json({
      message: "server error",
      detail: String(err),
    });
  }
};

module.exports = handler;
