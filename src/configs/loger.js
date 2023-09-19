const logger = require('morgan');

const logType = 'dev'

/**
 * Loger for the application
 *
 * @param   {ExpressApp}  app  app instance
 * @example log(app)
 */
exports.log = (app) =>{
    app.use(logger(logType));
}