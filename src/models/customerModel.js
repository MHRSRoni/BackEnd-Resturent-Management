const { Schema, model } = require('mongoose');

const customerSchema = new Schema({
    // name: {
    //     type: String,
    //     required: true
    // },
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
    status: {
        type: String,
        default: 'unverified'
    }
}, { timestamps: true, versionKey: false });

const customerModel = model('customers', customerSchema);

module.exports = customerModel;