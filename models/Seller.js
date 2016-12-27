const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({

    //....

}, { timestamps: true });


const Seller = mongoose.model('Seller', sellerSchema);

module.exports = Seller;
