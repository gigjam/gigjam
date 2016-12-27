const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({

    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Projects' }],

}, { timestamps: true });


const Developer = mongoose.model('Developer', developerSchema);

module.exports = Developer;
