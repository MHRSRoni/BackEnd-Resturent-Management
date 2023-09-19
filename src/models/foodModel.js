const {Schema, model} = require('mongoose')

const foodSchema = new Schema({
    title : {
        type : String,
        trim : true,
        maxLength : 255,
        required : true,
        unique : true,
    },
    category : {
        type : String,
        enum : ['beverage', 'meat', 'vegetarian', 'daily-special', 'deals'],
        required : true,
    },
    description : {
        type : String,
        trim : true,
        required : true
    },
    image : {
        type : [String],
        required : true,
    },
    calaory : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    },
    discount : {
        status : {
            type : Boolean,
            default : false,
        },
        percentage : {
            type : Number,
        },
    },
},{
    timestamps : true,
    versionKey : false,
})


const FoodModel = model('food', foodSchema);

module.exports = FoodModel