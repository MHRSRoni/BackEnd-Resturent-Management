const { allFood, createFood, readFoodById, updateFoodById, deleteFoodById, readFoodByKeyWord, foodByCategory, getFoodForPage, readRelatedFood } = require("../services/foodService")

exports.getAllFoodController = async (req, res, next) => {
    const data = await allFood(req, next)
    res.json(data)
}

exports.createFoodController = async (req, res, next) => {
    const data = await createFood(req,next)
    res.json(data)
}

exports.readFoodByIdController = async (req, res, next) => {
    const data = await readFoodById(req, next)
    res.json(data)
}

exports.updateFoodByIdController = async (req, res, next) => {
    const data = await updateFoodById(req, next)
    res.json(data)
}

exports.deleteFoodByIdController = async (req, res, next) => {
    const data = await deleteFoodById(req, next)
    res.json(data)
}

exports.readFoodByCategoryController = async (req, res, next) => {
    const data = await foodByCategory(req, next)
    res.json(data)
}

exports.readRelatedFoodController = async (req, res, next) => {
    const data = await readRelatedFood(req, next)
    res.json(data)
}

exports.readFoodByKeyWordController = async (req, res, next) => {
    const data = await readFoodByKeyWord(req, next)
    res.json(data)
}

exports.readFoodForPageController = async (req, res, next) => {
    const data = await getFoodForPage(req, next)
    res.json(data)
}