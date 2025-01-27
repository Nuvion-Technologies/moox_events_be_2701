const Events = require('../models/Blogs');
const User = require('../models/user');
const mongoose = require('mongoose');
const service = require('../models/service');
const Blogs = require("../models/Blogs");

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

// Add a new event
exports.add_event = async (req, res) => {
    console.log(1)
    try {
        const {
            user_id,
            title,
            description,
            readTime,
            date,
            author,
            tags,
            category,
        } = req.body;

        // Check if user exists
        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        // Retrieve event type name
        // const eventTypeData = await service.findById(category);
        // if (!eventTypeData) {
        //     return res.status(400).json({ message: 'Invalid category.' });
        // }

        // const event_name = eventTypeData.name; // Assuming service.findById returns a single object

        // Ensure required photos are uploaded
        // if (!req.files || !req.files.photo1 || !req.files.profile_photo) {
        //     return res
        //         .status(400)
        //         .json({ message: 'photo1 and profile_photo are required.' });
        // }

        // Extract filenames for required and optional photos
        const profilePhotoFileName = req.files.profile_photo[0].filename;
        const photo1FileName = req.files.photo1[0].filename;
        const photo2FileName = req.files.photo2?.[0]?.filename || null;
        const photo3FileName = req.files.photo3?.[0]?.filename || null;
        const photo4FileName = req.files.photo4?.[0]?.filename || null;
        const photo5FileName = req.files.photo5?.[0]?.filename || null;

        // Create new blog entry
        const newBlog = new Blogs({
            title,
            description,
            profile_photo: profilePhotoFileName, // Save name
            photo1: photo1FileName, // Save name
            photo2: photo2FileName,
            photo3: photo3FileName,
            photo4: photo4FileName,
            photo5: photo5FileName,
            readTime,
            date,
            author,
            tags,
            // category_id: category,
            categoryName: category,
        });

        // Save to database
        await newBlog.save();

        res
            .status(201)
            .json({ message: 'Blog added successfully.', blog: newBlog });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error adding blog.', error: error.message });
    }
};


exports.get_active_events = async (req, res) => {
    try {

        const events = await Events.find({active:true});
        const eventsWithPhotos = events.map(event => ({
            _id: event._id,
            title: event.title,
            description: event.description,
            read_time: event.read_time,
            date: event.date,
            author: event.author,
            tags:event.tags,
            category:event.categoryName,
            active: event.active,
            profile_photo: event.profile_photo,
            photo1: event.photo1,
            photo2: event.photo2,
            photo3: event.photo3,
            photo4: event.photo4,
            photo5: event.photo5,
        }));

        res.status(200).json({ blogs: eventsWithPhotos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events.', error: error.message });
    }
};

// Get all events
exports.get_events = async (req, res) => {
    try {
        const { user_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        const events = await Events.find();
        const eventsWithPhotos = events.map(event => ({
            _id: event._id,
            title: event.title,
            description: event.description,
            read_time: event.read_time,
            date: event.date,
            author: event.author,
            tags:event.tags,
            category:event.categoryName,
            active: event.active,
            profile_photo: event.profile_photo,
            photo1: event.photo1,
            photo2: event.photo2,
            photo3: event.photo3,
            photo4: event.photo4,
            photo5: event.photo5,
        }));

        res.status(200).json({ blogs: eventsWithPhotos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events.', error: error.message });
    }
};

// Change event status
exports.change_event_status = async (req, res) => {
    try {
        const { event_id, status, user_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        const event = await Events.findById(event_id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.active = status;
        await event.save();

        res.json({ message: `Event status updated to ${status ? 'active' : 'inactive'}` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status.', error: error.message });
    }
};
