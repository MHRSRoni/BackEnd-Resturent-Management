const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({

    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    cartId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    subTotal : {
        type : Number,
        required : true
    },
    discount : {
        type : Number,
        default : 0
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : ['pending', 'canceled', 'processing', 'shipping', 'complete']
    }

},
    {
        timestamps : true,
        versionKey : false
    }

)

const orderModel = model('carts', orderSchema);

module.exports = orderModel;