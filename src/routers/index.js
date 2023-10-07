const { adminRouter } = require('./adminRouter')
const { authRouter } = require('./authRouter')
const { customerRouter } = require('./customerRouter')
const {foodRouter} = require('./foodRouter')
const { infoRouter } = require('./infoRouter')
const { staffRouter } = require('./staffRouter')

//this is the base router for all routes
const baseRouter = require('express').Router()

//admin router
baseRouter.use('/admin', adminRouter)
//customer router
baseRouter.use('/customer', customerRouter)
//staff router
baseRouter.use('/staff', staffRouter)
//food router
baseRouter.use('/food', foodRouter)
//info router
infoRouter.use('/info', infoRouter)
//auth router
baseRouter.use('/auth', authRouter)


module.exports = {baseRouter}