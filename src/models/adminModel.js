const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    profilePic: {
        type: String,
    },
    role: {
        type: String,
        default: 'admin'
    },
    otp: {
        type: Number,
        default: 0
    }
}, { timestamps: true, versionKey: 'false' })

const adminModel = model('admins', adminSchema);

module.exports = adminModel;
