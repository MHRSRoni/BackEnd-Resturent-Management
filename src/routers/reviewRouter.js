const { readAllReviewController, readSingleReviewController, createReviewController, deleteReviewController } = require('../controllers/reviewController')
const { isLogin, giveAccessTo } = require('../middlewares/auth')

const reviewRouter = require('express').Router()
//========read============
// for food
reviewRouter.get('/all/:foodId', isLogin, giveAccessTo(['admin', 'customer']), readAllReviewController)
// by id
reviewRouter.get('/:reviewId', isLogin, giveAccessTo(['admin', 'customer']), readSingleReviewController)

//========create============
reviewRouter.post('/create', isLogin, giveAccessTo( 'customer'), createReviewController)

//========delete============
reviewRouter.delete('/:reviewId', isLogin, giveAccessTo('admin'), deleteReviewController)

module.exports = {reviewRouter}