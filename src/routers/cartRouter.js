const express = require('express');
const cartController = require('../controllers/cartController')
const cartRouter = express.Router();



// Cart Routes
cartRouter.post('/cart-add/:foodId/:qty', cartController.addCartListController)
cartRouter.get('/cartlist-by-id', cartController.getAllCartListById)
cartRouter.put('/cartlist-update/:foodId/:qty', cartController.updateCartListController)
cartRouter.delete('/cart-item-remove/:foodId', cartController.removeCartById)




module.exports = cartRouter;