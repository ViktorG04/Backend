import { Router } from "express";
import { body } from "express-validator";
import {
  getExchangeCurrency,
  getExchanges,
  getTypeMoney,
} from "../controllers/exchange.controller.js";
import validationParams from "../middlewares/validateParams.js";
import validateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/money", validateJWT, getTypeMoney);

router.get("/currency", validateJWT, getExchanges);

router.post(
  "/exchange",
  [
    validateJWT,
    body("to", "to is required").not().isEmpty(),
    body("from").not().isEmpty(),
    body("amount").not().isEmpty(),
    validationParams,
  ],
  getExchangeCurrency
);
export default router;
