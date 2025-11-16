import express from "express";
import { signin, signup } from "../controllers/authController.js";
import { getSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/session", getSession);

export default router;
