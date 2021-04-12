var axios = require("axios");

// Mapping table
// from country names defined in investing.com (total 93)
// to ISO 3166-1 alpha-2 codes
const investingCountries = {
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Bahrain: "BH",
  Bangladesh: "BD",
  Belgium: "BE",
  Bosnia: "BA",
  Botswana: "BW",
  Brazil: "BR",
  Bulgaria: "BG",
  Canada: "CA",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Costa_Rica: "CR",
  Cote_dIvoire: "CI",
  Croatia: "HR",
  Cyprus: "CY",
  Czech_Republic: "CZ",
  Denmark: "DK",
  Egypt: "EG",
  Europe: "EU",
  Finland: "FI",
  France: "FR",
  Germany: "DE",
  Greece: "GR",
  Hong_Kong: "HK",
  Hungary: "HU",
  Iceland: "IS",
  India: "IN",
  Indonesia: "ID",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Kuwait: "KW",
  Lebanon: "LB",
  Luxembourg: "LU",
  Malawi: "MW",
  Malaysia: "MY",
  Malta: "MT",
  Mauritius: "MU",
  Mexico: "MX",
  Mongolia: "MN",
  Montenegro: "ME",
  Morocco: "MA",
  Namibia: "NA",
  Netherlands: "NL",
  New_Zealand: "NZ",
  Nigeria: "NG",
  Norway: "NO",
  Oman: "OM",
  Pakistan: "PK",
  Palestine: "PS",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Qatar: "QA",
  Romania: "RO",
  Russian_Federation: "RU",
  Rwanda: "RW",
  Saudi_Arabia: "SA",
  Serbia: "RS",
  Singapore: "SG",
  Slovakia: "SK",
  Slovenia: "SI",
  South_Africa: "ZA",
  South_Korea: "KR",
  Spain: "ES",
  Sri_Lanka: "LK",
  Sweden: "SE",
  Switzerland: "CH",
  Taiwan: "TW",
  Tanzania: "TZ",
  Thailand: "TH",
  Tunisia: "TN",
  Turkey: "TR",
  USA: "US",
  Uganda: "UG",
  Ukraine: "UA",
  United_Arab_Emirates: "AE",
  UK: "GB",
  Venezuela: "VE",
  Viet_Nam: "VN",
  Vietnam: "VN",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

var handler = async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("type", "quotes");
    params.append("search_text", req.query.keyword);
    const result = await axios.post("https://kr.investing.com/search/service/searchTopBar", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    const data = result.data.quotes
      .filter((item) => item.pair_type === "equities" || item.pair_type === "etf")
      .map((item) => {
        return {
          id: item.pairId,
          ticker: item.symbol,
          name: item.name,
          exchange: item.exchange,
          country: investingCountries[item.flag],
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
