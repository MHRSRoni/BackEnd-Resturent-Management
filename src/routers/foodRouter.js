const { getAllFoodController, readFoodByIdController, readFoodByKeyWordController, readFoodByCategoryController, createFoodController, updateFoodByIdController, deleteFoodByIdController, readFoodForPageController } = require('../controllers/foodController');
const { isLogin, giveAccessTo } = require('../middlewares/auth');

const foodRouter = require('express').Router();

//food routes
foodRouter.get('/all-food/', getAllFoodController);
foodRouter.get('/', readFoodForPageController)
foodRouter.get('/id/:foodId', readFoodByIdController);
foodRouter.get('/search', readFoodByKeyWordController);
foodRouter.get('/category/:category', readFoodByCategoryController);
foodRouter.get('/related/:related', readFoodByCategoryController);

foodRouter.post('/create', isLogin, giveAccessTo('admin'), createFoodController);
foodRouter.put('/:foodId/update', isLogin, giveAccessTo('admin'), updateFoodByIdController);
foodRouter.delete('/:foodId/delete', isLogin, giveAccessTo('admin'), deleteFoodByIdController);



module.exports = {foodRouter};