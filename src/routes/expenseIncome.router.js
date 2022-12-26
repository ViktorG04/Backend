import { Router } from "express";
import { check, body } from "express-validator";

import {
  validateIdUser,
  validateIdAccount,
  validateIdTypeTransfer,
  validateIdCategory,
} from "../helpers/dbValidator.js";

import validationParams from "../middlewares/validateParams.js";
import {
  createExpenseOrIncome,
  getExpenseIncome,
  getExpenseIncomeById,
} from "../controllers/expenseIncome.controller.js";
const router = Router();

router.get("/expenseIncome", getExpenseIncome);

router.get("/expenseIncome/:id", getExpenseIncomeById);

router.post(
  "/expenseIncome",
  [
    body("idAccount").custom(validateIdAccount),
    body("idTransfer").custom(validateIdTypeTransfer),
    body("idCategory").custom(validateIdCategory),
    body("amount", "amount is required").not().isEmpty(),
    body("date").isDate(),
  ],
  validationParams,
  createExpenseOrIncome
);

export default router;
