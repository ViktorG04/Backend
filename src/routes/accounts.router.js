import { Router } from "express";
import { check, body } from "express-validator";

import { validateIdAccount, validateIdMoney, validateIdUser } from "../helpers/dbValidator.js";
import validateParams from "../middlewares/validateParams.js";
import validateJWT from "../middlewares/validate-jwt.js"
import {
  createAccount,
  getAllAccountsById,
  getAccountById,
  getAccounts,
  pathAccount,
} from "../controllers/accounts.controller.js";

const router = Router();

router.get("/accounts/transfer/:idUser", [
  validateJWT,
  check("idUser").custom(validateIdUser), validateParams], getAccounts);

router.get(
  "/accounts/:idUser",
  [
    validateJWT,
    check("idUser").custom(validateIdUser), validateParams],
  getAllAccountsById
);

router.get("/accounts/info/:idAccount", [validateJWT, check("idAccount").custom(validateIdAccount), validateParams], getAccountById);

router.post(
  "/accounts",
  [
    validateJWT,
    body("bankName", "bankName is required").not().isEmpty(),
    body("credit", "Account Credit is required").not().isEmpty(),
    body("dateExpiration", "Date is required").not().isEmpty(),
    body("idTypeMoney").custom(validateIdMoney),
    body("numberAccount", "Number Account is required").not().isEmpty(),
    validateParams,
  ],
  createAccount
);

router.put("/accounts/:idAccount", [validateJWT, check("idAccount").custom(validateIdAccount), validateParams], pathAccount);

export default router;
