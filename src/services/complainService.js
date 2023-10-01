const { complainModel } = require("../models/complainModel")

/**
 * @typedef {string} ObjectId - A string representing a MongoDB ObjectId.
 */

/**
 * create a new complain
 *
 * @param   {ObjectId}  customerId   which customer created the complain
 * @param   {ObjectId}  type   which type of complain you want
 * @param   {string}  message  your message here
 * @param   {number}  tableNo   your table no here
 *@async  use await before calling
 * @return  {object}           result object
 */
const createComplainService = async (customerId, type, message, tableNo) => {

    //validation will be added here
    const complain = await complainModel.create({customerId, type, message, tableNo})
    if(complain){
        return {status : "success", operation : 'created', data : complain}
    }
    return {status : "error", data : "falied to create complain"}
   

}

/**
 * read complain data from complain model
 *@param {string} type 'all' for all complain,'single' for complainId,  'customer' for customerId
 * @param   {ObjectId}  id  customerId or complain or null to get review data
 *@async use await before calling
 * @return  {object}          result object
 */
const readComplainService = async (type , id) => {
    //validation will be added
    let complain = null
    if(type.toLowerCase() == "all"){
        complain = await complainModel.find({}).select({updatedAt : 0})
        return {status : "success", operation : 'read', data : complain}
    }
    else if(type.toLowerCase() == "single"){
        complain = await complainModel.findById(id).select({_id : 0, updatedAt : 0})
        return {status : "success", operation : 'read', data : complain}
    }
    else if(type.toLowerCase() == "customer"){
        complain = await complainModel.find({customerId : id}).select({_id : 0, updatedAt : 0})
        return {status : "success", operation : 'read', data : complain}
    }
    else {
        return {status : "error", operation :'read', data : "wrong type passed to the service"}
    }

}


/**
 * delete a complain from the database
 *
 * @param   {ObjectId}  complainId  complainId to delete the complain
 *@async use await before calling
 * @return  {object}          result object
 */
const deleteComplainService = async (complainId) => {
    //validation will be added here
    const complain = await complainModel.findByIdAndDelete(complainId)
    if(complain){
        return {status : "success", operation : 'deleted',data : complain}
    }
    else {
        return {status : "fail"}
    }
}


module.exports = {
    createComplainService,
    readComplainService,
    deleteComplainService,
}