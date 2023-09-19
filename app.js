//dependencies
const express = require('express')
//configuration
const {log} = require('./src/configs/loger')
const {secure} = require('./src/configs/security')
const {connectDatabase} =require('./src/configs/database')
require('dotenv').config()
//errorHandler
const {CustomErrorHandler} = require('custom-error-handlers')






const app = express()

secure(app)   //security implementation
log(app)      //loging implementation


//routes


//error handlers
app.use(CustomErrorHandler)




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
    try{
        app.listen(port, ()=>{
            console.log('✅listening on port '+port)
                connectDatabase(DB_NAME) // database connection
            })
    } catch (error) {
        console.log('❌failed to start the server: '+error)
    }
}

module.exports = {startApp}