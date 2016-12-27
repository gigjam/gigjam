const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema({

    imageUrls: Array,
    title: String,
    description: String,
    customer: String, 
    contact: String

}, { timestamps: true });


const Idea = mongoose.model('Idea', ideaSchema);

module.exports = Idea;
