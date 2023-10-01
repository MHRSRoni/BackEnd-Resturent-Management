const { complainRouter } = require('./complainRouter')
const { reviewRouter } = require('./reviewRouter')

//this is the base router for all routes
const baseRouter = require('express').Router()

//review router
baseRouter.use('/review', reviewRouter)
baseRouter.use('/complain', complainRouter)

module.exports = {baseRouter}