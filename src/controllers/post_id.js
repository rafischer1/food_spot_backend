// Controller
require('dotenv').config()
const model = require('../models/post_id')

const getPostbyId = (req, res, next) => {
  return model.getOnePost(req.params.post_id)
    .catch(error => {
      return next({
        status: 404,
        message: error
      })
    })
    .then(data => {
      res.status(200).json(data)
    })
}


module.exports = { getPostbyId }