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
        const foodId = req.headers?.foodId

        //get the review
        const result = await readReviewService(foodId)

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

        //get the review
        const result = await readReviewService('all')

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
        const foodId = req.headers?.foodId

        //get the review
        const result = await deleteReviewService(foodId)

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