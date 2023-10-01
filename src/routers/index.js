const { reviewRouter } = require('./reviewRouter')

//this is the base router for all routes
const baseRouter = require('express').Router()

//review router
baseRouter.use('/review', reviewRouter)
baseRouter.use('/review', reviewRouter)

module.exports = {baseRouter}