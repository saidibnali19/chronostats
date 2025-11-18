import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import { updateProfile } from "../controllers/accountController.js";

const router = Router();

// User must be logged in, and files handled by multer
router.post("/edit", authMiddleware, upload.single("avatar"), updateProfile);

export default router;
