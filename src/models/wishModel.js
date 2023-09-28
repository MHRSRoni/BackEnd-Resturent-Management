const mongoose = require('mongoose');

const wishSchema = mongoose.Schema({
    
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    foodId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    }
},
    {
        timestamps : true,
        versionKey : false
    }

)

const wishModel = mongoose.model('wishes', wishSchema);

module.exports = wishModel;