// Controller// Controller
const model = require('../models/posts_tags')

const getAll = (req, res, next) => {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
}




module.exports = { getAll }