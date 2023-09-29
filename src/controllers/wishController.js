const wishModel = require('../models/wishModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


exports.addWishListController = async (req, res) => {
    try {
        let customer_id = req.headers.id;
        let food_id = req.params.foodId;

        await wishModel.updateOne(
            {customerId: customer_id},
            {
                $set: { customerId: customer_id},
                $addToSet: { foodId: food_id }
            },
            {upsert: true})


        return res.status(200).json({
            status: 'success',
            message: 'Food added to Wishlist'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}


exports.getAllWishById = async (req, res) => {
    try {
        let customer_id = req.headers.id;

        let data = await wishModel.find({customerId: customer_id})

        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: "Something went wrong"
        })
    }
}

exports.getWishListDetailsController = async (req, res) => {
    try {
        let customer_id = new ObjectId(req.headers.id)

        let matchStage = {$match: {customerId: customer_id}}

        let JoinFoodStage={$lookup: {from: "foods", localField: "foodId", foreignField: "_id", as: "food"}};
        
        let unwindFoodStage={$unwind: "$food"}

        let projectionStage = {$project: {
            'foodId': 0, 'createdAt': 0, 'updatedAt': 0,
            'food.slug': 0, 'food.createdAt': 0, 'food.updatedAt': 0

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
        return res.status(500).json({
            status: "fail",
            message: "Something went wrong"
        })
    }
}


exports.removeWishListController = async (req, res) => {
    try {

        let customer_id = req.headers.id;
        let foodId = req.params.foodId;


        let result= await wishModel.updateOne(
            { customerId: customer_id, foodId }, 
            { $pull: {foodId}
        });

        
        if (result.modifiedCount === 1) {
            return res.status(200).json({
                status: 'success',
                message: 'Food removed from Wishlist'
            });
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'Food not found in Wishlist'
            });
        }


    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

