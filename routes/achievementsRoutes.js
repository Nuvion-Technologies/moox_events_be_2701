const express = require('express');
const { add_ach, change_ach_status,get_active_ach, get_ach} = require('../controllers/achievementsController');

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "achievements/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const fs = require('fs');
const path = require("path");

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Ensure only expected file types are allowed (e.g., images)
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        if (extname) {
            cb(null, true);
        } else {
            cb(new Error("Only images are allowed"));
        }
    },
});

router.post('/add-achievements',upload.fields([
        { name: "photo", maxCount: 1 },
    ]), add_ach);
router.post('/change-achievements-status', change_ach_status);
router.post('/get-achievements', get_ach);
router.post('/get-all-achievements', get_active_ach);
module.exports = router;
