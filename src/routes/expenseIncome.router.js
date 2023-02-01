import { Router } from "express";
import { body } from "express-validator";

import {
  validateIdAccount,
  validateIdTypeTransfer,
  validateIdCategory,
} from "../helpers/dbValidator.js";
import validateJWT from "../middlewares/validate-jwt.js";
import validationParams from "../middlewares/validateParams.js";
import {
  createExpenseOrIncome,
} from "../controllers/expenseIncome.controller.js";
const router = Router();

router.post(
  "/expenseIncome",
  [
    validateJWT,
    body("idAccount").custom(validateIdAccount),
    body("idTypeTransfer").custom(validateIdTypeTransfer),
    body("idCategory").custom(validateIdCategory),
    body("amount", "amount is required").not().isEmpty(),
    body("date").isDate(),
    validationParams,
  ],
  createExpenseOrIncome
);

export default router;
