import { Router } from "express";
import { getStates } from "../controllers/states.controller.js";

const router = Router();

router.put("/states", getStates);

export default router;
