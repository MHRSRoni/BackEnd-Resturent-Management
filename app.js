//dependencies
const express = require('express')
//configuration
const { log } = require('./src/configs/loger')
const { secure } = require('./src/configs/security')
const { connectDatabase } = require('./src/configs/database')
require('dotenv').config()
//errorHandler
const { NotFoundError } = require('custom-error-handlers/error')
const { CustomErrorHandler } = require('custom-error-handlers')
//router
const { baseRouter } = require('./src/routers')





const app = express()

secure(app)   //security implementation
log(app)      //loging implementation


//body parser
app.use(express.json())

//routes
app.use('/api/v2', baseRouter)


//not found handeling
app.use('*', (req, res, next) => {
    try {
        throw new NotFoundError('page not found', 404)
    } catch (error) {
        next(error)
    }
})

//error handlers
app.use(CustomErrorHandler({log : true}))




/**
 * @typedef PORT 
 * @type {Number}
 */
/**
 * @typedef DB_NAME 
 * @type {String}
 */



/** 
 * Start the server
 * @param {Number|PORT} port PORT of the server
 * @param {String|DB_NAME} DB_NAME Database name for the application
 *@example startApp(PORT, DB_NAME) // server starting function
 */


const startApp = async (port, DB_NAME) => {
    try {
        app.listen(port, () => {
            console.log('✅listening on port ' + port)
            connectDatabase(DB_NAME) // database connection
        })
    } catch (error) {
        console.log('❌failed to start the server: ' + error)
    }
}


module.exports = { startApp }