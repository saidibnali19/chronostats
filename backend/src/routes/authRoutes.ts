import express from "express";
import { signin, signout, signup } from "../controllers/authController.js";
import { getSession } from "../controllers/sessionController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/session", getSession);

export default router;
