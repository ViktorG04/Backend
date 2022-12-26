import { Router } from "express";
import { getAllReports } from "../controllers/reportsController.js";

const router = Router();

router.get("/reports", getAllReports);

export default router;
