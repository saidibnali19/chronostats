import multer from "multer";
import path from "path";
import fs from "fs";

// Absolute path for uploads folder (Fix for Render)
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure uploads directory exists (important for Render)
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Store images locally under /uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // Use absolute path
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, unique + ext);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Only image files allowed"));
        }
        cb(null, true);
    },
});

export default upload;
