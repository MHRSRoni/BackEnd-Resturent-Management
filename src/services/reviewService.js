const { reviewModel } = require("../models/reviewModel")

/**
 * create a new review
 *
 * @param   {ObjectId}  foodId   which food you want to review
 * @param   {string}  comment  your comment here
 * @param   {number}  rating   your rating here
 *@async  use await before calling
 * @return  {object}           result object
 */
const createReviewService = async (foodId, comment, rating) => {
    //validation will be added here
    const review = await reviewModel.create({foodId, comment, rating}).select({_id : 0})
    if(review){
        return {status : "success", operation : 'created', data : review}
    }
    return {status : "error", data : "falied to create review"}

}

/**
 * get review data from review model
 *
 * @param   {ObjectId|"all"}  foodId  foodId to get review data
 *@async use await before calling
 * @return  {object}          result object
 */
const getReviewService = async (foodId) => {
    //validation will be added
    let review = null
    if(foodId.toLowerCase() == "all"){
        review = await reviewModel.find({}).select({foodId:1, comment:1, rating: 1, createdAt : 1})
        return {status : "success", operation : 'read', data : review}
    }
    else{
        review = await reviewModel.find({foodId}).select({foodId:1, comment:1, rating:1, createdAt : 1})
        return {status : "success", operation : 'read', data : review}
    }

}


/**
 * delete a review from the database
 *
 * @param   {ObjectId}  foodId  foodId to delete the review
 *@async use await before calling
 * @return  {object}          result object
 */
const deleteReviewService = async (foodId) => {
    //validation will be added here
    const review = await reviewModel.findOneAndDelete({foodId})
    if(review){
        return {status : "success", operation : 'deleted',data : review}
    }
    else {
        return {status : "fail"}
    }
}


module.exports = {createReviewService, deleteReviewService, getReviewService,}