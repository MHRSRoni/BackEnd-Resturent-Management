const {Schema, model} = require('mongoose')

const complainSchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        required : true,
    },
    type : {
        type : String,
        enum : ["staff-behaviour", "food-quality", "serveice", "atmosphere", "other"],
        required : true,
    },
    tableNo : {
        type : String,
        maxLength : 999,
    },
    message : {
        type : String,
        maxLength : 9999,
        required : true
    }

},{timestamps : true, versionKey : false})

const complainModel = model('complain', complainSchema);

module.exports = {complainModel}