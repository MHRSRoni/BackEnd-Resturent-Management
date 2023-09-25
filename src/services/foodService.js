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
        const data = await FoodModel.create(foodData)
        return {status : 'Success', data: data}
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
            return {status : 'Success', data: data}
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
            return {status : 'Success', data: data}
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
        const data = await FoodModel.findByIdAndUpdate(id, foodData, {new : true})
        if(!data) {
            throw new NotFoundError("food not found", 404, 'EN010303')
        }else{
            return {status : 'Success', data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.deleteFoodById = async (req, next) => {
    try {
        const id = req.params?.foodId 
        if(!id){
            throw new BadRequestError('foodId not specified', 400, 'EB010401')
        }
        const data = await FoodModel.findByIdAndDelete(id)
        if(!data){
            throw new NotFoundError('food not found', 404, 'EN010402')
        }
        else{
            return {status : 'Success', data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.foodByCategory = async (req, next) => {
    try {
        const category = req.params?.category
        if(!category){
            throw new BadRequestError('category not specified', 400, 'EB010501')
        }
        const data = await FoodModel.find({ category: category})
        if(!data || data.length < 1){
            throw new NotFoundError('food not found', 404, 'EB010502')
        }
        else{
            return {status : 'Success', data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.readRelatedFood = async (req, next) => {
    try {
        const related = req.params?.related
        if(!related){
            throw new BadRequestError('category not specified', 400, 'EB010501')
        }
        const data = await FoodModel.find({ category: related}).limit(5)
        if(!data || data.length < 1){
            throw new NotFoundError('food not found', 404, 'EB010502')
        }
        else{
            return {status : 'Success', data: data}
        }
    } catch (error) {
        next(error)
    }
}

exports.readFoodByKeyWord = async (req, next) => {
    try {
        const keyword = req.query?.keyword.toLowerCase()
        if(!keyword){
            throw new NotFoundError('keyword not specified', 404, 'EB010701')
        }
        const regex = new RegExp(keyword, 'g')
        const data = await FoodModel.find({$or : [{$text : {$search : keyword}},{title : {$regex : regex}}]},{score : {$meta : 'textScore'}}).sort({score: {$meta : 'textScore'}})
        if(!data || data.length < 1){
            throw new NotFoundError('food not found', 404, 'EB010702')
        }
        return {status : 'Success', data: data}
    } catch (error) {
        next(error)
    }
}

exports.getFoodForPage = async (req, next) => {
    try {
        const pageSize = 12
        const pageNumber = req.query?.pageNumber ?? 1
        const search = req.query?.search
        let data = {}
        let total = 0
        if(!search){
            total = await FoodModel.find().count("total")
            data = await FoodModel.find().skip(parseInt(pageSize) * (pageNumber - 1) ).limit(parseInt(pageSize))
        }
        else{
            
            total = await FoodModel.find({category : search}).count()
            data = await FoodModel.find({category : search}).skip(parseInt(pageSize) * (pageNumber - 1)).limit(pageSize)
        }        
        if(data?.length < 1){
            console.log(data)
            throw new NotFoundError('food not found', 404, 'EB010702')
        }
        totalPage = Math.ceil(parseInt(total) / pageSize)
        return {status : 'Success', data, totalPage}
    } catch (error) {
        next(error)
    }
}
