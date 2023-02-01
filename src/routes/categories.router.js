import { Router } from "express";
import { getCategories } from "../controllers/categories.controller.js";
import validateJWT from "../middlewares/validate-jwt.js";
const router = Router();

router.get("/categories", validateJWT, getCategories);

export default router;
