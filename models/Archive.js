const mongoose = require('mongoose');

const ArchiveSchema = new mongoose.Schema({
    name: String,
    username: String,
    user: String,
    password: String,
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Export
module.exports = mongoose.model('Archive', ArchiveSchema);