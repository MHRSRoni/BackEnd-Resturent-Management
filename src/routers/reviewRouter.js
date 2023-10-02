const { readAllReviewController, readSingleReviewController, createReviewController, deleteReviewController } = require('../controllers/reviewController')

const reviewRouter = require('express').Router()
//========read============
// for food
reviewRouter.get('/all/:foodId', readAllReviewController)
// by id
reviewRouter.get('/:reviewId', readSingleReviewController)

//========create============
reviewRouter.post('/create', createReviewController)

//========delete============
reviewRouter.delete('/:reviewId', deleteReviewController)

module.exports = {reviewRouter}