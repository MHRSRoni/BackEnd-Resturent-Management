const wishModel = require('../models/wishModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.addWishListController = async (req, res) => {
    try {
        let customer_id = req.headers.id;
        let food_id = req.params.foodId;

        await wishModel.updateOne({customerId: customer_id, foodId: food_id},{ $set: { customerId: customer_id, foodId: food_id } }, {upsert: true})

        return res.status(200).json({
            status: 'success',
            message: 'Added to Wishlist'
        })
    } catch (error) {
        return res.status(200).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}


exports.getWishListController = async (req, res) => {
    try {
        let customer_id = new ObjectId(req.headers.id)

        let matchStage = {$match: {customerId: customer_id}}
        let JoinFoodStage={$lookup: {from: "foods", localField: "foodId", foreignField: "_id", as: "food"}};
        let unwindFoodStage={$unwind: "$food"}

        let projectionStage = {$project: {
            'createdAt': 0, 'updatedAt': 0,
            'food._id': 0, 'food.slug': 0,
            'food.createdAt': 0, 'food.updatedAt': 0

        }}

        let data= await wishModel.aggregate([
            matchStage,
            JoinFoodStage,
            unwindFoodStage,
            projectionStage
        ])

        return res.status(200).json({
            status: "success",
            data: data
        })


    } catch (error) {
        return res.status(200).json({
            status: "fail",
            message: "Something Went Wrong"
        })
    }
}


exports.removeWishListController = async (req, res) => {
    try {
        let customer_id = req.headers.id;
        let foodId = req.params.foodId;

        await wishModel.deleteOne({customerId: customer_id, foodId: foodId})

        return res.status(200).json({
            status: 'success',
            message: 'Wishlist deleted'
        })
    } catch (error) {
        return res.status(200).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}