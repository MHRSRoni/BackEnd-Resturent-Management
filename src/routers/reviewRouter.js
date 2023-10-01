const { readAllReviewController, readSingleReviewController, createReviewController, deleteReviewController } = require('../controllers/reviewController')

const reviewRouter = require('express').Router()
//read review 
reviewRouter.get('/all', readAllReviewController)
reviewRouter.get('/:reviewId', readSingleReviewController)
//create review
reviewRouter.post('/create', createReviewController)
//delete review
reviewRouter.delete('/:reviewId', deleteReviewController)

module.exports = {reviewRouter}