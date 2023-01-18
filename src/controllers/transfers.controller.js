import TypeTransfer from "../database/models/typeTransfer.js";
import dateFormat from "../helpers/dateFormat.js";

export const getTransfers = async (req, res) => {
  try {
    const query = await TypeTransfer.findAll({ attributes: [["idTypeTransfer", "id"], "name"] });

    if (!query.length) {
      return res.status(400).json({ message: "no data" });
    }
    res.status(200).json(query);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contact the administrator",
    });
  }
};

export const getTransferById = async (req, res) => {};

export const createTransfer = async (req, res) => {
  const { date, idAccountOrigin, idAccountDestiny, amountOrigin, amountDestiny } = req.body;

  //query account Origin
  /*  let {available, expensive, limit} = idAccountOrigin;

 available - amountOrigin;
 expensive + amountOrigin;

 if(available > limit){
  return 'error';
 } */

  //query account beneficiary
  /*  let { available, income, limit } = idAccountDestiny;

  available + amountDestiny;
  income + amountDestiny;

  if (available > limit) {
    return "error";
  } */

  //safe transfer
  //format date
  let time = dateFormat(date);

  const transfer = {
    date: time,
    idAccountOrigin,
    idAccountDestiny,
    amountOrigin,
    amountDestiny,
  };

  res.status(201).json(transfer);
};

export const updateTransfer = async (req, res) => {};
