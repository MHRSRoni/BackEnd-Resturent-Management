const express = require('express');
const wishRouter = express.Router();
const wishController = require('../controllers/wishController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');


// wishList routes

wishRouter.post('/wishlist-add/:foodId', isLogin, giveAccessTo('customer'), wishController.addWishListController)
wishRouter.get('/wish-by-id', isLogin, giveAccessTo('customer'), wishController.getAllWishById)
wishRouter.get('/wishlist-details', isLogin, giveAccessTo('customer'), wishController.getWishListDetailsController)
wishRouter.delete('/wishlist-remove/:foodId', isLogin, giveAccessTo('customer'), wishController.removeWishListController)




module.exports = {wishRouter};