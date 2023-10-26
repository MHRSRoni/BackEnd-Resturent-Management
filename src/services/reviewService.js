const { reviewModel } = require("../models/reviewModel")

/**
 * @typedef {string} ObjectId - A string representing a MongoDB ObjectId.
 */

/**
 * create a new review
 *
 * @param   {ObjectId}  customerId   which customer created the review
 * @param   {ObjectId}  foodId   which food you want to review
 * @param   {string}  comment  your comment here
 * @param   {number}  rating   your rating here
 *@async  use await before calling
 * @return  {object}           result object
 */
const createReviewService = async (customerId, foodId, comment, rating) => {

    //validation will be added here
    const review = await reviewModel.create({ customerId, foodId, comment, rating })
    if (review) {
        return { status: "success", operation: 'created', data: review }
    }
    return { status: "error", data: "falied to create review" }


}

/**
 * read review data from review model
 *@param {string} count 'single' for reviewId, 'all' for foodId
 * @param   {ObjectId}  id  reviewId or foodId to get review data
 *@async use await before calling
 * @return  {object}          result object
 */
const readReviewService = async (count, id, page, limit) => {

    let review = {};

    if (count.toLowerCase() == "all") {

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const reviewCount = await reviewModel.find({ foodId: id }).count();

        const allReviews = await reviewModel.find({ foodId: id })
            .skip(startIndex)
            .limit(limit)

        review.totalReview = reviewCount;
        review.pageCount = Math.ceil(reviewCount / limit);

        if (endIndex < reviewCount) {
            review.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            review.prev = {
                page: page - 1,
                limit: limit
            }
        }
        review.resultReviews = allReviews;

        return { status: 'success', operation: 'read', data: review }

    }
    else {
        review = await reviewModel.findById(id).select({ _id: 0, updatedAt: 0 })
        return { status: "success", operation: 'read', data: review }
    }

};


/**
 * delete a review from the database
 *
 * @param   {ObjectId}  reviewId  reviewId to delete the review
 *@async use await before calling
 * @return  {object}          result object
 */
const deleteReviewService = async (reviewId) => {
    //validation will be added here
    const review = await reviewModel.findByIdAndDelete(reviewId)
    if (review) {
        return { status: "success", operation: 'deleted', data: review }
    }
    else {
        return { status: "fail" }
    }
}

module.exports = { createReviewService, deleteReviewService, readReviewService }