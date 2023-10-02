const cartRouter = require('express').Router();
const cartController = require('../controllers/cartController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');



// Cart Routes
cartRouter.post('/cart-add/:foodId/:qty',isLogin, giveAccessTo('customer'), cartController.addCartListController)
cartRouter.get('/cartlist-by-id', giveAccessTo('customer'), cartController.getAllCartListById)
cartRouter.put('/cartlist-update/:foodId/:qty', giveAccessTo('customer'), cartController.updateCartListController)
cartRouter.delete('/cart-item-remove/:foodId', giveAccessTo('customer'), cartController.removeCartById)




module.exports = {cartRouter};