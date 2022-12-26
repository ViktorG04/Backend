import { Router } from "express";
import { body } from "express-validator";

import { validateIdAccount } from "../helpers/dbValidator.js";
import validationParams from "../middlewares/validateParams.js";
import {
  getExchangeCurrency,
  getExchanges,
} from "../controllers/exchange.controller.js";
const router = Router();

router.get("/currency", getExchanges);

router.get(
  "/currency/exchange",
  [
    body("idAccountOrigin").custom(validateIdAccount),
    body("idAccountDestiny").custom(validateIdAccount),
  ],
  validationParams,
  getExchangeCurrency
);
export default router;
