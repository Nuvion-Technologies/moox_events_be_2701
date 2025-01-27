const express = require('express');
const { add_service, change_status,get_active_services, get_services, get_all_services} = require('../controllers/serviceController');


const router = express.Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "services/");
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
router.post('/add-service',upload.fields([
        { name: "photo", maxCount: 1 },
    ]), add_service);
router.post('/change-service-status', change_status);
router.post('/get-service', get_services);
router.get('/get-active-services', get_active_services);
router.get('/services', get_all_services);

module.exports = router;
