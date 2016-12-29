const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({

    _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: String, // Seller or Developer
    messgae: String

}, { timestamps: true });


const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
