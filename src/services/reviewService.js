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
    const review = await reviewModel.create({customerId,foodId, comment, rating}).select({_id : 0})
    if(review){
        return {status : "success", operation : 'created', data : review}
    }
    return {status : "error", data : "falied to create review"}

}

/**
 * read review data from review model
 *@param {string} count 'single' for reviewId, 'all' for foodId
 * @param   {ObjectId}  id  reviewId or foodId to get review data
 *@async use await before calling
 * @return  {object}          result object
 */
const readReviewService = async (count , id) => {
    //validation will be added
    let review = null
    if(count.toLowerCase() == "all"){
        review = await reviewModel.find({foodId : id}).select({updatedAt : 0})
        return {status : "success", operation : 'read', data : review}
    }
    else{
        review = await reviewModel.findById(id).select({_id : 0, updatedAt : 0})
        return {status : "success", operation : 'read', data : review}
    }

}


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
    if(review){
        return {status : "success", operation : 'deleted',data : review}
    }
    else {
        return {status : "fail"}
    }
}


module.exports = {createReviewService, deleteReviewService, readReviewService,}