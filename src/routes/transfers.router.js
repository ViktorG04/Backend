import { Router } from "express";
import { check, body } from "express-validator";

import { validateIdAccount } from "../helpers/dbValidator.js";
import validationParams from "../middlewares/validateParams.js";

import {
  createTransfer,
  getTransferById,
  getTransfers,
  updateTransfer,
} from "../controllers/transfers.controller.js";

const router = Router();

router.get("/transfers", getTransfers);
router.get("/transfers/:id", getTransferById);
router.post(
  "/transfers",
  [
    body("date").isDate(),
    body("idAccountOrigin").custom(validateIdAccount),
    body("idAccountDestiny").custom(validateIdAccount),
    body("amountOrigin").not().isEmpty(),
    body("amountDestiny").not().isEmpty(),
  ],
  validationParams,
  createTransfer
);

router.put("/transfers/:id", updateTransfer);

export default router;
