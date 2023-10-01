const { createReviewService, readReviewService, deleteReviewService } = require("../services/reviewService")

const createReviewController = async (req, res, next) => {
    try {
        //get the data from the request
        const foodId = req.body?.foodId 
        const comment = req.body?.comment 
        const rating = req.body?.rating

        //create a new review
        const result = await createReviewService(foodId, comment, rating)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const readSingleReviewController = async (req, res, next) => {
    try {
        //get the data from the request
        const reviewId = req.params?.reviewId

        //get the review
        const result = await readReviewService("single",reviewId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const readAllReviewController = async (req, res, next) => {
    try {
        //get the data from the request
        const foodId = req.params?.foodId

        //get the review
        const result = await readReviewService('all' , foodId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const deleteReviewController = async (req, res, next) => {
    try {
        //get the data from the request
        const reviewId = req.params?.reviewId

        //get the review
        const result = await deleteReviewService(reviewId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

module.exports = {
    createReviewController,
    readSingleReviewController,
    readAllReviewController,
    deleteReviewController,
}