const { getAndUpdateCountController } = require('../controllers/infoController');

const infoRouter = require('express').Router()

//visitor Count
infoRouter.get('/visitorCount', getAndUpdateCountController); 

module.exports = {infoRouter}