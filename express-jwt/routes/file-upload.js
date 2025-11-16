import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const router = express.Router();
const allowedExt = [".jpg", ".jpeg", ".png", ".txt"];
// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "fileUploads");
console.log("Upload Directory:", uploadDir);

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Created folder:", uploadDir);
}


function getFormattedTimestamp() {
    const now = new Date();

    const pad = (n) => n.toString().padStart(2, '0');
    const padMs = (n) => n.toString().padStart(3, '0');

    const dd = pad(now.getDate());
    const mm = pad(now.getMonth() + 1);
    const yyyy = now.getFullYear();
    const hh = pad(now.getHours());
    const min = pad(now.getMinutes());
    const ss = pad(now.getSeconds());
    const ms = padMs(now.getMilliseconds());

    return `${dd}-${mm}-${yyyy}-${hh}-${min}-${ss}-${ms}`;
}

console.log(getFormattedTimestamp());


// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // folder where files will be saved
    },
    filename: (req, file, cb) => {
        const uniqueName = getFormattedTimestamp() + "-" + file.originalname;
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
// router.post("/upload", upload.single("file"), (req, res) => {
router.post("/upload", (req, res) => {
    console.log('file/upload called');
    upload.single("file")(req, res, (err) => {
        if (err) {
            console.log("MULTER ERROR:", err);
            return res.status(400).json({ error: err.message });
        }
          res.status(201).json({
            message: "File uploaded successfully!!!",
        });
    });
    // try {

    //     return res.status(201).json({
    //         message: "File uploaded successfully",
    //         file: req.file
    //     });
    // } catch (error) {
    //     return res.status(500).json({ error: "File upload failed" });
    // }
});

// upload multiple files
router.post("/uploads", upload.array("files", 5), (req, res) => {
    console.log('file/uploads called');
    return res.status(201).json({
        message: "Files uploaded",
        files: req.files
    });
});


export default router;