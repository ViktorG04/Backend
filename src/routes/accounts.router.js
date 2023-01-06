import { Router } from "express";
import { check, body } from "express-validator";

import { validateIdAccount, validateIdMoney, validateIdUser } from "../helpers/dbValidator.js";
import validateParams from "../middlewares/validateParams.js";
import {
  createAccount,
  getAccountById,
  getAccounts,
  pathAccount,
  updateAccount,
} from "../controllers/accounts.controller.js";

const router = Router();

router.get("/accounts", getAccounts);

router.get("/accounts/:id", [check("id").custom(validateIdUser)], validateParams, getAccountById);

router.post(
  "/accounts",
  [
    body("bankName", "bankName is required").not().isEmpty(),
    body("credit", "Account Credit is required").not().isEmpty(),
    body("dateExpiration", "Date is required").not().isEmpty(),
    body("idTypeMoney").custom(validateIdMoney),
    body("idUser").custom(validateIdUser),
    body("numberAccount", "Number Account is required").not().isEmpty(),
  ],
  validateParams,
  createAccount
);

router.put("/account/:id", updateAccount);

router.patch("/account/:id", [check("id").custom(validateIdAccount)], validateParams, pathAccount);

export default router;
