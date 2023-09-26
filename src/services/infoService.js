const {InfoModel} = require('../models')
const {NotFoundError} = require('custom-error-handlers/error')


//Note : visitor count is only desplayed in home page?
exports.getVisitorCount = async (req, next) => {
    try {
        const data = await InfoModel.findOneAndUpdate({},{$inc : {visitorCount : 1}},{visitorCount : true})
        if(!data){
            throw new NotFoundError('No information found', 500, 'EN020101')
        }
        return {status : "success", data : data}
    } catch (error) {
        next(error)
    }
}
