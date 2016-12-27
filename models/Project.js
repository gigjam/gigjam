const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    imageUrls: Array,
    title: String,
    description: String,
    customer: String, 
    contact: String,
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer' },

}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
