const express = require('express');
const wishRouter = express.Router();
const wishController = require('../controllers/wishController');
const { giveAccessTo } = require('../middlewares/auth');


// wishList routes

wishRouter.post('/add/:foodId', giveAccessTo('customer'), wishController.addWishListController)
wishRouter.get('/', giveAccessTo('customer'), wishController.getAllWishById)
wishRouter.get('/details', giveAccessTo('customer'), wishController.getWishListDetailsController)
wishRouter.delete('/remove/:foodId', giveAccessTo('customer'), wishController.removeWishListController)




module.exports = {wishRouter};