const express = require('express');
const wishRouter = express.Router();
const wishController = require('../controllers/wishController')


// wishList routes

wishRouter.post('/wishlist-add/:foodId', wishController.addWishListController)
wishRouter.get('/wish-by-id', wishController.getAllWishById)
wishRouter.get('/wishlist-details', wishController.getWishListDetailsController)
wishRouter.delete('/wishlist-remove/:foodId', wishController.removeWishListController)




module.exports = wishRouter;