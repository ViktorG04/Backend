import { Router } from "express";
import { getAllReports } from "../controllers/reportsController.js";
import validateJWT from "../middlewares/validate-jwt.js";
import validateQueryParams from "../middlewares/validateQueryParams.js";

const router = Router();

router.post("/reports", [validateJWT, validateQueryParams], getAllReports);

export default router;
