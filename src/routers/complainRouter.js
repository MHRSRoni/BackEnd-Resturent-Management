const { readAllComplainController, readCustomerComplainController, readSingleComplainController, createComplainController, deleteComplainController } = require('../controllers/complainController')

const complainRouter = require('express').Router()

//access permission will be added to all 


//========read============
//for admin
complainRouter.get('/all', readAllComplainController)
//for customer
complainRouter.get('/all', readCustomerComplainController)
//by id
complainRouter.get('/:complainId', readSingleComplainController)

//========create============
complainRouter.post('/create', createComplainController)

//========delete============
complainRouter.delete('/delete/:complainId', deleteComplainController)

module.exports = {complainRouter}