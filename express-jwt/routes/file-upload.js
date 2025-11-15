import express from "express";
import multer from "multer";

const router = express.Router();
const allowedExt = [".jpg", ".jpeg", ".png", ".txt"];

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // folder where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 },  //2MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const extOK = allowedExt.includes(ext);
        if (extOK) {
            cb(null, true);
        } else {
            cb(
                new Error("Only JPG, JPEG, PNG, and TXT files are allowed"),
                false
            );
        }
    }
});

// API to upload a single file
router.post("/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(201).json({
            message: "File uploaded successfully",
            file: req.file
        });
    } catch (error) {
        return res.status(500).json({ error: "File upload failed" });
    }
});

// upload multiple files
router.post("/uploads", upload.array("files", 5), (req, res) => {
    return res.status(201).json({
        message: "Files uploaded",
        files: req.files
    });
});


export default router;