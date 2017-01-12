const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({

    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    imageUrls: Array,
    title: String,
    description: String,
    customer: String, 
    contact: String,
    projectType: [String],
    skills: [String],
    type: [String],
    lookingFor: String,
    hours: String,
    estimate: Number,
    developerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Developer' },

}, { timestamps: true });


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
