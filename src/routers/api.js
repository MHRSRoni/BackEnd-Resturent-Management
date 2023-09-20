const { getAllFoodController, readFoodByIdController, readFoodByKeyWordController, readFoodByCategoryController, createFoodController, updateFoodByIdController, deleteFoodByIdController, readFoodForPageController } = require('../controllers/foodController');
const { getAndUpdateCountController } = require('../controllers/infoController');

const router = require('express').Router();

//food routes
router.get('/all-food/', getAllFoodController);
router.get('/food', readFoodForPageController)
router.get('/food/id/:foodId', readFoodByIdController);
router.get('/food/search', readFoodByKeyWordController);
router.get('/food/category/:category', readFoodByCategoryController);

router.post('/food/create', createFoodController);
router.put('/food/:foodId/update', updateFoodByIdController);
router.delete('/food/:foodId/delete', deleteFoodByIdController);

//visitor Count
router.get('/visitorCount', getAndUpdateCountController); //

module.exports = router;