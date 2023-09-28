const express = require('express');
const wishRouter = express.Router();
const wishController = require('../controllers/wishController')


// wishList routes

wishRouter.post('/wishlist-add/:foodId', wishController.addWishListController)
wishRouter.get('/wishlist', wishController.getWishListController)
wishRouter.delete('/wishlist-remove/:foodId', wishController.removeWishListController)




module.exports = wishRouter;