const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

const reqPerMin = 100

const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: reqPerMin,
    legacyHeaders: false,
    standardHeaders: 'draft-7',
    message: 'You can only request 100 times per minute'

})

/**
 * Security implementation for the application
 * @param {ExpressApp} app express app instance
 * @example secure(app)
 */

exports.secure = (app) => {
    app.use(helmet())
    app.use(hpp())
    app.use(limiter)

    // var allowlist = ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://nitexapplication.netlify.app']
    // var corsOptionsDelegate = function (req, callback) {
    //     var corsOptions;
    //     if (allowlist.indexOf(req.header('Origin')) !== -1) {
    //         corsOptions = { origin: true, credentials: true }
    //     } else {
    //         corsOptions = { origin: false }
    //     }
    //     callback(null, corsOptions)
    // }

    // app.use(cors(corsOptionsDelegate));

    app.use(cors({
        origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
        credentials: true
    }))
} 