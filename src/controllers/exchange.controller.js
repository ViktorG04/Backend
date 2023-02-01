import TypeMoney from "../database/models/typeMoney.js";
import { findAccount } from "../helpers/consults.js";
import { consultExchange, getLatestExchange } from "../helpers/fixerConnection.js";
import { ERROR_SERVER } from "../config/config.js";
import { exchanges } from "../data.js"
export const getExchangeCurrency = async (req, res) => {
  const { idAccountOrigin, idAccountDestiny, amount } = req.body;
  const money = parseFloat(amount);

  try {
    //query idAccountOrigin
    const { available, typeMoney: typeMoneyOrigin } = await findAccount(idAccountOrigin)

    if (available < money) {
      return res.status(400).json({ message: `insufficient credit to transfer, available: ${available}` });
    }

    //query idAccountDestiny
    const { credit, expensive: expenseDestiny, typeMoney: typeMoneyDestiny, available: availableDestiny } = await findAccount(idAccountDestiny);

    if (!expenseDestiny) {
      return res.status(401).json({ message: `No more credit can be added to the designated limit: ${credit}` });
    }

    const newExpensive = expenseDestiny - money;
    const newAvailable = availableDestiny + money;
    const total = Math.abs(newExpensive) + Math.abs(newAvailable);
    const totalAddTransfer = +total.toFixed(2);

    if (totalAddTransfer > credit) {
      return res.status(401).json({ message: `No more credit can be added to the designated limit: ${credit} total Transfer: ${totalAddTransfer}` });
    }

    //query consult fixer convert money
    const { currency, exchange } = await consultExchange({ to: typeMoneyDestiny, from: typeMoneyOrigin, amount: money })
    console.log(exchange);
    const transferTo = `${typeMoneyDestiny} to ${typeMoneyOrigin}`;

    res.status(200).json({ currency, exchange, transferTo });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: ERROR_SERVER });
  }
};

export const getExchanges = async (req, res) => {
  try {
    const rates = await getLatestExchange();
    const exchanges = [];
    for (const i in rates) {
      exchanges.push({
        origin: "USD",
        destiny: i,
        change: rates[i]
      });
    };
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