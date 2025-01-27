const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const achievements = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    photo:{type:String,required: true},
    contentType: { type: String,required:false },
    achievement_date: { type: Date },
    active: { type: Boolean, default: true },
    uploadedOn:{type:Date,default:Date.now},
});

// Explicitly naming the model to avoid collisions
const Achievements = mongoose.models.Achievements || mongoose.model('Achievements', achievements);

module.exports = Achievements;
