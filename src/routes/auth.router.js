import { Router } from "express";
import { body } from "express-validator";
import { login } from "../controllers/auth.controller.js";
import validationParams from "../middlewares/validateParams.js";

const router = Router();

router.post(
  "/auth",
  [
    body("email", "email is not validated").isEmail(),
    body("password", "Min Length is 8!").isLength({ min: 8 }),
  ],
  validationParams,
  login
);

export default router;
