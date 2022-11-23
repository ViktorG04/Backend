import { Router } from "express";

import {
  createNewUser,
  updateUserById,
  getUserById,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users/:id", getUserById);

router.post("/users", createNewUser);

router.put("/users/:id", updateUserById);

export default router;
