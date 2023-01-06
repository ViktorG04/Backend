import { Router } from "express";
import { check, body } from "express-validator";

import validationParams from "../middlewares/validateParams.js";
import { emailIsRegister, validateIdUser } from "../helpers/dbValidator.js";
import { createNewUser, updateUserById, getUserById } from "../controllers/users.controller.js";

const router = Router();

router.get("/user/:id", [check("id").custom(validateIdUser)], validationParams, getUserById);

router.post(
  "/register",
  [
    body("name", "name is required").not().isEmpty(),
    body("password", "min length 8").isLength({ min: 8 }),
    body("email", "email is not validated").isEmail(),
    body("email").custom(emailIsRegister),
  ],
  validationParams,
  createNewUser
);

router.put(
  "/user/:id",
  [check("id").custom(validateIdUser), body("newPassword", "min length 8").isLength({ min: 8 })],
  validationParams,
  updateUserById
);

export default router;
