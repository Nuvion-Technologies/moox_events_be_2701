const express = require('express');
const { add_event, change_event_status,get_active_events, get_events} = require('../controllers/blogsController');

const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "blogs/");
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
router.post('/add-blog',upload.fields([
        { name: "photo1", maxCount: 1 },
    { name: "photo2", maxCount: 1 },
    { name: "photo3", maxCount: 1 },
    { name: "photo4", maxCount: 1 },
    { name: "photo5", maxCount: 1 },
    { name: "profile_photo", maxCount: 1 },
    ]), add_event);
router.post('/change-blog-status', change_event_status);
router.post('/get-blogs', get_events);
router.post('/get-all-blogs', get_active_events);
module.exports = router;
