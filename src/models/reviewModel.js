const { Schema, model } = require('mongoose')

const reviewSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    foodId: {
        type: Schema.Types.ObjectId,
        requried: true,
    },
    comment: {
        type: String,
        maxlength: 99999,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    }
}, { timestamps: true, versionKey: false })

const reviewModel = model('review', reviewSchema)

module.exports = { reviewModel };