import express from "express";
import { signin, signout, signup } from "../controllers/authController.js";
import { getSession } from "../controllers/sessionController.js";
import { refresh } from "../controllers/refreshController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.get("/session", getSession);
router.post("/refresh", refresh);

export default router;
