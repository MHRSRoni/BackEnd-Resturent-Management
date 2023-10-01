const { reviewRouter } = require('./reviewRouter')

//this is the base router for all routes
const router = require('express').Router()

//review router
router.use('/review', reviewRouter)