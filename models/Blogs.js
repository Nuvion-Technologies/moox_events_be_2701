const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const blogs = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    profile_photo: { type: String, required: true },
    contentType: { type: String },
    readTime:{type:String},
    date: { type: Date },
    author:{type:String},
    tags:{type: String},
    photo1:{type:String,required:true},
    photo2:{type:String,required:false},
    photo3:{type:String,required:false},
    photo4:{type:String,required:false},
    photo5:{type:String,required:false},
    category_id:{type:Schema.Types.ObjectId, ref: 'service'},
    categoryName:{type:String},
    active: { type: Boolean, default: true },
    uploadedOn:{type:Date,default:Date.now},
});

// Explicitly naming the model to avoid collisions
const Blogs = mongoose.models.Blogs || mongoose.model('Blogs', blogs);

module.exports = Blogs;
