const mongoose = require('mongoose');

const galleryschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: true },
    contentType: { type: String },
    active: { type: Boolean, default: true },
    uploadedOn:{type:Date,default:Date.now},
});

// Explicitly naming the model to avoid collisions
const Gallery = mongoose.models.Gallery || mongoose.model('Gallery', galleryschema);

module.exports = Gallery;
