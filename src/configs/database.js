const mongoose = require('mongoose')

/***
 * Database Connection
 * @param {String} DB_NAME Database name for the application
 * @example await connectDatabase(DB_NAME)
 */

const connectDatabase = async (DB_NAME) => {
    try {
        await mongoose.connect(process.env.DB_URI, { dbName: DB_NAME})
        console.log('✅Database connected successfully')
    } catch (error) {
        console.log('❌Database connection failed: ' + error)
    }
}

module.exports = {connectDatabase}

