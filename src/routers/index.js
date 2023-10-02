const { adminRouter } = require('./adminRouter')
const { customerRouter } = require('./customerRouter')
const { staffRouter } = require('./staffRouter')

//this is the base router for all routes
const baseRouter = require('express').Router()

//admin router
baseRouter.use('/admin', adminRouter)
//customer router
baseRouter.use('/customer', customerRouter)
//staff router
baseRouter.use('/staff', staffRouter)

module.exports = {baseRouter}