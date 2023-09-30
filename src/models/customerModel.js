const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: Number,
        required: true
    },
    password: {
        type: String,
    },
    ban: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'customer'
    }
}, { timestamps: true, versionKey: false });

const customerModel = model('customers', customerSchema);

module.exports = customerModel;