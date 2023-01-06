import { v4 as uuid4 } from "uuid";

import { transfers } from "../data.js";

export const getTransfers = async (req, res) => {
  try {
    res.status(200).json(transfers);
  } catch (error) {
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

  const transferNumber = uuid4();

  //format date
  let time = new Date(date);
  time = time.split("/").reverse().join("/");

  const transfer = {
    transferNumber,
    date: time,
    idAccountOrigin,
    idAccountDestiny,
    amountOrigin,
    amountDestiny,
  };

  return res.status(201).json(transfer);
};

export const updateTransfer = async (req, res) => {};
