import { exchanges } from "../data.js";
import TypeMoney from "../database/models/typeMoney.js";

export const getExchanges = async (req, res) => {
  try {
    //query db
    res.status(200).json(exchanges);
  } catch (error) {
    return res.status(500).json({ msg: "contact the administrator" });
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
    return res.status(500).json({ msg: "contact the administrator" });
  }
};

export const getExchangeCurrency = async (req, res) => {
  const { idAccountOrigin, idAccountDestiny, amount } = req.body;

  try {
    //query idAccountOrigin
    const typeMoney = "dollar";
    const available = 400.0;

    if (available < amount) {
      return res.status(400).json(`insufficient credit to transfer, available: ${available}`);
    }

    //query idAccountDestiny
    const typeMoney2 = "euro";

    //query currency
    const currency = 0.98;

    //exchange
    const exchange = amount * currency;

    res.status(200).json({ available, currency, exchange });
  } catch (error) {
    return res.status(500).json({ msg: "contact the administrator" });
  }
};
