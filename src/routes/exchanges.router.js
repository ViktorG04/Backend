import { Router } from "express";
import { body } from "express-validator";

import { validateIdAccount } from "../helpers/dbValidator.js";
import validationParams from "../middlewares/validateParams.js";
import validateJWT from "../middlewares/validate-jwt.js";
import {
  getExchangeCurrency,
  getExchanges,
  getTypeMoney,
} from "../controllers/exchange.controller.js";
const router = Router();

router.get("/money", validateJWT, getTypeMoney);

router.get("/currency", validateJWT, getExchanges);

router.post(
  "/exchange",
  [
    validateJWT,
    body("idAccountOrigin").custom(validateIdAccount),
    body("idAccountDestiny").custom(validateIdAccount),
  ],
  validationParams,
  getExchangeCurrency
);
export default router;
