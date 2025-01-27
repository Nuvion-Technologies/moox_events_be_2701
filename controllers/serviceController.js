
const Service = require('../models/service');
const User = require('../models/user');
const mongoose = require('mongoose');

// Maximum allowed photo size in bytes (e.g., 5MB)
const MAX_PHOTO_SIZE = 5 * 1024 * 1024; // 5MB

// Fetch all active services
exports.get_active_services = async (req, res) => {
    try {

        const services = await Service.find({ active: true }, 'name _id');

        res.status(200).json({ services });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching active services.', error: error.message });
    }
};


exports.add_service = async (req, res) => {
    try {
        let { user_id, name, description } = req.body;


        // Check for user existence and authorization
        const userExists = await User.findById(user_id); // Find user by ID
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }

        // Ensure 'name' is provided
        if (!name) {
            return res.status(400).json({ message: 'Name is required.' });
        }
const photo = req.files.photo[0].filename;
        // Create a new Service object and save it
        const newService = new Service({
            name,
            description,
            photo, // Store photo as a Buffer
        });

        // Save the service to the database
        await newService.save();

        // Return a success response
        return res.status(201).json({ message: 'Service added successfully.', service: newService });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error adding service.', error: error.message });
    }
};

exports.get_services=async (req, res) => {
    try {

        let { user_id } = req.body;
        const userExists = await User.findById(user_id); // Find user by ID
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }
        const events = await Service.find(); // Fetch all events

        res.json({ events });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
}

exports.get_all_services=async (req, res) => {
    try {
        const events = await Service.find({active:true}); // Fetch all events
        const eventss = events.map(client => ({
            id: client._id,
            title: client.name,
            status: client.description,
            image: client.photo,
        }));
        res.json({ events: eventss});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching events', error: error.message });
    }
}

exports.change_status=async (req, res) => {

    const { event_id, status,user_id } = req.body;
    console.log(status)
    const userExists = await User.findById(user_id); // Find user by ID
        if (!userExists) {
            return res.status(400).json({ message: 'Unauthorized User' });
        }
    try {

        const event = await Service.findById(event_id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        event.active = status; // Toggle the status
        await event.save();
        res.json({ message: `Event status updated to ${status ? 'active' : 'inactive'}` });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update status', error: error.message });
    }
}