const express = require('express');
const wishRouter = express.Router();
const wishController = require('../controllers/wishController');
const { giveAccessTo } = require('../middlewares/auth');


// wishList routes

wishRouter.post('/wishlist-add/:foodId', giveAccessTo('customer'), wishController.addWishListController)
wishRouter.get('/wish-by-id', giveAccessTo('customer'), wishController.getAllWishById)
wishRouter.get('/wishlist-details', giveAccessTo('customer'), wishController.getWishListDetailsController)
wishRouter.delete('/wishlist-remove/:foodId', giveAccessTo('customer'), wishController.removeWishListController)




module.exports = {wishRouter};