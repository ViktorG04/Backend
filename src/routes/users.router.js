import { Router } from "express";
import { body } from "express-validator";
import { emailIsRegister } from "../helpers/dbValidator.js";
import {
  createNewUser,
  updateUserById,
  disabledUserById,
} from "../controllers/users.controller.js";
import validateJWT from "../middlewares/validate-jwt.js";
import validationParams from "../middlewares/validateParams.js";

const router = Router();

router.post(
  "/register",
  [
    body("name", "name is required").not().isEmpty(),
    body("password", "min length 8").isLength({ min: 8 }),
    body("email", "email is not validated").isEmail(),
    body("email").custom(emailIsRegister),
    validationParams,
  ],
  createNewUser
);

router.put(
  "/user",
  [validateJWT, body("newPassword", "min length 8").isLength({ min: 8 }), validationParams],
  updateUserById
);

router.put("/user/disabled", validateJWT, disabledUserById);

export default router;
