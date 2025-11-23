import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import {
    changePassword,
    deleteAccount,
    updateProfile,
} from "../controllers/accountController.js";

const router = Router();

// Edit profile
router.post("/edit", authMiddleware, upload.single("avatar"), updateProfile);

// Change password
router.post("/change-password", authMiddleware, changePassword);

// Delete account
router.delete("/", authMiddleware, deleteAccount);

export default router;
