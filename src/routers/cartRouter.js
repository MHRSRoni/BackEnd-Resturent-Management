const cartRouter = require('express').Router();
const cartController = require('../controllers/cartController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');



// Cart Routes
cartRouter.post('/add/:foodId/:qty',isLogin, giveAccessTo('customer'), cartController.addCartListController)
cartRouter.get('/', giveAccessTo('customer'), cartController.getAllCartListById)
cartRouter.put('/update/:foodId/:qty', giveAccessTo('customer'), cartController.updateCartListController)
cartRouter.delete('/remove/:foodId', giveAccessTo('customer'), cartController.removeCartById)




module.exports = {cartRouter};