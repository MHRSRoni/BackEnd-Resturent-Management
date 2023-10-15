const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const {rateLimit} = require('express-rate-limit');

const reqPerMin = 100

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: reqPerMin,
    legacyHeaders: false,
    standardHeaders: 'draft-7',
    message : 'You can only request 100 times per minute'

    })

/**
 * Security implementation for the application
 * @param {ExpressApp} app express app instance
 * @example secure(app)
 */

exports.secure = (app) =>{
    app.use(helmet())
    app.use(hpp())
    app.use(cors({credentials: true}))
    app.use(limiter)
} 