import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "ChronoStats backend is running ✅" });
});

export default router;
