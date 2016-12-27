const crypto = require('crypto');
const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({

    type: String,
    token: String,

}, { timestamps: true });


/**
 * Generate token middleware
 */
inviteSchema.pre('save', function save(next) {
    const invite = this;
    crypto.randomBytes(16, (err, buf) => {
        if (err) { return next(err); }
        const token = buf.toString('hex');
        invite.token = token;
        next();
    });
});

const Invite = mongoose.model('Invite', inviteSchema);

module.exports = Invite;

