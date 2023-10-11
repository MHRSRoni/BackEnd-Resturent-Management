const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    status: {
        type: String,
        default: 'unverified'
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        default: 0
    },
    ban: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'customer'
    },
}, { timestamps: true, versionKey: false });

const customerModel = model('customers', customerSchema);

module.exports = customerModel;