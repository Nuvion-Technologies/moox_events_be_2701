const express = require('express');
const { add_member,get_active_members,get_members,change_member_status} = require('../controllers/teamController');
const router = express.Router();


const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "teams/");
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
router.post('/add-member',upload.fields([
        { name: "photo", maxCount: 1 },
    ]),add_member);
router.post('/get-active-members',get_active_members);
router.post('/get-all-member',get_members);
router.post('/change-member-status',change_member_status);

module.exports = router;
