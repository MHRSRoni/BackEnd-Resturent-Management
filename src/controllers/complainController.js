const { createComplainService, readComplainService, deleteComplainService } = require("../services/complainService")

const createComplainController = async (req, res, next) => {
    try {
        //get the data from the request
        const customerId = req.headers?.customerid
        const type = req.body?.type 
        const message = req.body?.message 
        const tableNo = req.body?.tableNo

        //create a new complain
        const result = await createComplainService(customerId, type, message, tableNo)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const readAllComplainController = async (req, res, next) => {
    try {
        //get the data from the request

        //get the complain
        const result = await readComplainService('all', null)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const readCustomerComplainController = async (req, res, next) => {
    try {
        //get the data from the request
        const customerId = req.params?.customerId

        //get the complain
        const result = await readComplainService('customer', customerId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const readSingleComplainController = async (req, res, next) => {
    try {
        //get the data from the request
        const complainId = req.params?.complainId

        //get the complain
        const result = await readComplainService("single", complainId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}

const deleteComplainController = async (req, res, next) => {
    try {
        //get the data from the request
        const complainId = req.params?.complainId

        //delete the complain
        const result = await deleteComplainService(complainId)

        //give the response with result
        return res.json(result)

    } catch (error) {
        //pass error to error handler
        next(error)
    }
}


module.exports = {
    createComplainController,
    readAllComplainController,
    readSingleComplainController,
    readCustomerComplainController,
    deleteComplainController
}