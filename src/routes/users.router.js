import { Router } from "express";
import { check, body } from "express-validator";
import { emailIsRegister, validateIdUser } from "../helpers/dbValidator.js";
import { createNewUser, updateUserById } from "../controllers/users.controller.js";
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
  "/user/:id",
  [
    validateJWT,
    check("id").custom(validateIdUser),
    body("newPassword", "min length 8").isLength({ min: 8 }),
    validationParams,
  ],
  updateUserById
);

export default router;
