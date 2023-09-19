const { getAllFoodController, readFoodByIdController, readFoodByKeyWordController, readFoodByCategoryController, createFoodController, updateFoodByIdController, deleteFoodByIdController } = require('../controllers/foodController');

const router = require('express').Router();

router.get('/food/', getAllFoodController);
router.get('/food/id/:foodId', readFoodByIdController);
router.get('/food/:keyword', readFoodByKeyWordController);
router.get('/food/category/:category', readFoodByCategoryController);


router.post('/food/create', createFoodController);

router.put('/food/:foodId/update', updateFoodByIdController);

router.delete('/food/:foodId/delete', deleteFoodByIdController);


module.exports = router;