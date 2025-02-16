const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    type: {
        type: String,
        required: [true, "Account type is required"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Admin', adminSchema);