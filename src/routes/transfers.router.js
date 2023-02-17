import { Router } from "express";
import { body } from "express-validator";
import { validateIdAccount } from "../helpers/dbValidator.js";
import { createTransfer, getTransfers } from "../controllers/transfers.controller.js";
import validationParams from "../middlewares/validateParams.js";
import validateJWT from "../middlewares/validate-jwt.js";

const router = Router();

router.get("/transfers", validateJWT, getTransfers);

router.post(
  "/transfers",
  [
    validateJWT,
    body("date").isDate(),
    body("idAccountOrigin").custom(validateIdAccount),
    body("idAccountDestiny").custom(validateIdAccount),
    body("amountOrigin").not().isEmpty(),
    body("amountDestiny").not().isEmpty(),
    body("description").not().isEmpty(),
    validationParams,
  ],
  createTransfer
);

export default router;
