const Team = require('../models/team');
const User = require('../models/user');
const mongoose = require('mongoose');

const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

exports.add_member = async (req, res) => {
    try {
        const { user_id, name, description, position, facebook_link,instagram_link } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }


const photo = req.files.photo[0].filename;
        const newEvent = new Team({
            name,
            description,
            position,
            facebook_link,
            instagram_link,
            photo, // Convert Base64 to Buffer
            contentType: 'image/png', // Adjust based on input
        });

        await newEvent.save();

        res.status(201).json({ message: 'Event added successfully.', event: newEvent });
    } catch (error) {
        res.status(500).json({ message: 'Error adding event.', error: error.message });
    }
};

exports.get_members = async (req, res) => {
    try {
        const { user_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        const events = await Team.find();
        const eventsWithPhotos = events.map(event => ({
            id:event._id,
            name: event.name,
            description: event.description,
            position: event.position,
            facebook_link: event.facebook_link,
            instagram_link:event.instagram_link,
            active: event.active,
            photo: event.photo,
        }));

        res.status(200).json({ events: eventsWithPhotos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events.', error: error.message });
    }
};

exports.change_member_status = async (req, res) => {
    try {
        const { event_id, status, user_id } = req.body;

        const userExists = await User.findById(user_id);
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        const event = await Team.findById(event_id);
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

exports.get_active_members = async (req, res) => {
    try {
        const events = await Team.find({active: true});
        const eventsWithPhotos = events.map(event => ({
            id:event._id,
            name: event.name,
            description: event.description,
            position: event.position,
            facebook_link: event.facebook_link,
            instagram_link:event.instagram_link,
            active: event.active,
            photo: event.photo,
        }));

        res.status(200).json({ events: eventsWithPhotos });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events.', error: error.message });
    }
};