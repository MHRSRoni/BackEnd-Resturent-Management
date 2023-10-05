const { readAllReviewController, readSingleReviewController, createReviewController, deleteReviewController } = require('../controllers/reviewController')
const { isLogin, giveAccessTo } = require('../middlewares/auth')

const reviewRouter = require('express').Router()
//========read============
// for food
reviewRouter.get('/all/:foodId', giveAccessTo(['admin', 'customer']), readAllReviewController)
// by id
reviewRouter.get('/:reviewId', giveAccessTo(['admin', 'customer']), readSingleReviewController)

//========create============
reviewRouter.post('/create', giveAccessTo( 'customer'), createReviewController)

//========delete============
reviewRouter.delete('/:reviewId', giveAccessTo('admin'), deleteReviewController)

module.exports = {reviewRouter}