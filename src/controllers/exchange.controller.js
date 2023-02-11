import TypeMoney from "../database/models/typeMoney.js";
import { consultExchange, getLatestExchange } from "../helpers/fixerConnection.js";
import { ERROR_SERVER } from "../config/config.js";

export const getExchangeCurrency = async (req, res) => {
  const { to, from, amount } = req.body;
  const amountParse = parseFloat(amount);
  try {
    //query consult fixer convert money
    const { currency, exchange } = await consultExchange({ to, from, amount });
    const change = parseFloat(exchange).toFixed(2);
    const taxes = Math.abs(amountParse - change).toFixed(2);

    res.status(200).json({ currency, exchange: change, taxes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_SERVER });
  }
};

export const getExchanges = async (req, res) => {
  const exchanges = [
    { origin: "USD", destiny: "ARS", change: 185.308964 },
    { origin: "USD", destiny: "EUR", change: 0.917902 },
    { origin: "USD", destiny: "GTQ", change: 7.853713 },
    { origin: "USD", destiny: "MXN", change: 18.797385 },
  ];
  try {
    /*  const rates = await getLatestExchange();
    const exchanges = [];
    for (const i in rates) {
      exchanges.push({
        origin: "USD",
        destiny: i,
        change: rates[i]
      });
    }; */
    res.status(200).json(exchanges);
  } catch (error) {
    return res.status(500).json({ message: ERROR_SERVER });
  }
};

export const getTypeMoney = async (req, res) => {
  try {
    const requestMoney = await TypeMoney.findAll({ attributes: [["idTypeMoney", "id"], "name"] });
    if (!requestMoney.length) {
      return res.status(400).json({ message: "no data" });
    }
    res.status(200).json(requestMoney);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: ERROR_SERVER });
  }
};
