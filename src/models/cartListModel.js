const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({

    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    cart : [{
        foodId : {
            type : mongoose.Schema.Types.ObjectId,
            required: true
        },
        qty : {
            type : Number,
            required : true
        }
    }]
},
    {
        timestamps : true,
        versionKey : false
    }

)

const cartModel = model('carts', cartSchema);

module.exports = cartModel;