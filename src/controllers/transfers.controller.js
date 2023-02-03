import TypeTransfer from "../database/models/typeTransfer.js";
import Account from "../database/models/account.js";
import Transfer from "../database/models/transfer.js";
import { ERROR_SERVER } from "../config/config.js";
import { Accounting } from "../helpers/accounting.js";

export const getTransfers = async (req, res) => {
  try {
    const query = await TypeTransfer.findAll({ attributes: [["idTypeTransfer", "id"], "name"] });

    if (!query.length) {
      return res.status(400).json({ message: "no data" });
    }
    res.status(200).json(query);
  } catch (error) {
    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};

export const createTransfer = async (req, res) => {
  const {
    date,
    idAccountOrigin,
    idAccountDestiny,
    amountOrigin,
    amountDestiny,
    taxes,
    description,
  } = req.body;
  const taxesFloat = parseFloat(taxes);
  try {
    //1 account Origin
    const { availableFloat: availableOrigin, expensiveFloat: expensiveOrigin } = await Accounting(
      idAccountOrigin,
      amountOrigin,
      true
    );

    //2 account Destiny
    const { availableFloat: availableDestiny, expensiveFloat: expenseDestiny } = await Accounting(
      idAccountDestiny,
      amountDestiny,
      false
    );

    //3 - insert transfer and update accounts
    const transfer = {
      dateReport: date,
      amountOrigin,
      amountDestiny,
      idAccountOrigin,
      idAccountDestiny,
      taxes: taxesFloat,
      description,
    };

    await Promise.all([
      Transfer.build(transfer).save(),
      Account.update(
        { available: availableOrigin, expensive: expensiveOrigin },
        { where: { idAccount: idAccountOrigin } }
      ),
      Account.update(
        { available: availableDestiny, expensive: expenseDestiny },
        { where: { idAccount: idAccountDestiny } }
      ),
    ]);

    res.status(201).json({ message: "successful transfer" });
  } catch (error) {
    if (typeof error === "string") {
      return res.status(400).json({ message: error });
    }

    res.status(500).json({
      message: ERROR_SERVER,
    });
  }
};
