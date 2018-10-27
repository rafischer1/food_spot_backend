// Controller posts_tags
const model = require('../models/posts_tags')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts_tags) => {
      res.status(200).json(posts_tags)
    })
}

module.exports = { getAll }