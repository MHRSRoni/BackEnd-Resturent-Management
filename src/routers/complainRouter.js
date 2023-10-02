const { readAllComplainController, readCustomerComplainController, readSingleComplainController, createComplainController, deleteComplainController } = require('../controllers/complainController')
const { giveAccessTo } = require('../middlewares/auth')

const complainRouter = require('express').Router()

//access permission will be added to all 


//========read============
//for admin
complainRouter.get('/all', giveAccessTo('admin'), readAllComplainController)
//for customer
complainRouter.get('/all', giveAccessTo('customer'), readCustomerComplainController)
//by id
complainRouter.get('/:complainId', giveAccessTo(['customer', 'admin']), readSingleComplainController)

//========create============
complainRouter.post('/create', giveAccessTo('customer'), createComplainController)

//========delete============
complainRouter.delete('/delete/:complainId', giveAccessTo('admin'), deleteComplainController)

module.exports = {complainRouter}