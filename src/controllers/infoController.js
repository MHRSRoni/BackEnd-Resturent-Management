const { InfoModel } = require("../models")
const { getVisitorCount } = require("../services/infoService")

exports.getAndUpdateCountController = async (req, res, next) => {
    const data = await getVisitorCount(req, next)
    res.json(data)
}