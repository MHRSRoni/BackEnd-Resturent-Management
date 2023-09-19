const { default: slugify } = require('slugify');
const {FoodModel, InfoModel} = require('../models');
const {NotFoundError, BadRequestError} = require('custom-error-handlers/error');


exports.createFood = async (req, next) => {
    try {
        const foodData = req.body
        if(!(foodData instanceof Object)){
            throw new BadRequestError('food data must be an object', 400, 'EB010601')
        }
        if(foodData.title){
            foodData.slug = slugify(foodData.title,{lower:true, trim:true})
        }
        const food = await FoodModel.create(foodData)
        return {data:food}
    } catch (error) {
        next(error)
    }
}

exports.allFood = async (req, next) => {
    try {
        const data = await FoodModel.find({})
        if (!data || data.length < 1) {
            throw new NotFoundError("no food found", 404, 'EN010101')
        }
        else {
            return {data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.readFoodById = async (req, next) => {
    try {
        const id = req.params.foodId
        if (!id) {
            throw new BadRequestError("foodId not specified", 400, 'EB010201')
        }
        const data = await FoodModel.findById(id)
        if(!data){
            throw new NotFoundError("food not found", 404, 'EN010202')
        }
        else {
            return {data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.updateFoodById = async (req, next) => {
    try {
        const foodData = req.body
        if(!(foodData instanceof Object)) {
            throw new BadRequestError("food data must be an object", 400, 'EB010301')
        }
        const id = req.params.foodId
        if(!id){
            throw new BadRequestError("foodId not specified', 400, 'EB010302')")
        }
        const data = await FoodModel.findByIdAndUpdate(id, foodData)
        if(!data) {
            throw new NotFoundError("food not found", 404, 'EN010303')
        }else{
            return {data : data}
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteFoodById = async (req, next) => {
    try {
        const id = req.params.foodId 
        if(!id){
            throw new BadRequestError('foodId not specified', 400, 'EB010401')
        }
        const data = await FoodModel.findByIdAndDelete(id)
        if(!data){
            throw new NotFoundError('food not found', 404, 'EN010402')
        }
        else{
            return {data : data}
        }
    } catch (error) {
        next(error)
    }
}

exports.foodByCategory = async (req, next) => {
    try {
        const category = req.params.category
        if(!category){
            throw new BadRequestError('category not specified', 400, 'EB010501')
        }
        console.log(category)
        console.log(category)
        const data = await FoodModel.find({ category: category})
        if(!data || data.length < 1){
            throw new NotFoundError('food not found', 404, 'EB010502')
        }
        else{
            return {data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.readFoodByKeyWord = async (req, next) => {
    try {
        const keyword = req.params.keyword
        if(!keyword){
            throw new NotFoundError('keyword not specified', 404, 'EB010701')
        }
        const data = 'await' 
        if(!data){
            throw new NotFoundError('food not found', 404, 'EB010702')
        }
        return {data: data}
    } catch (error) {
        next(error)
    }
}
