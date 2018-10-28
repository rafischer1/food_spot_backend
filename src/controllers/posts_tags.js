// Controller posts_tags
const model = require('../models/posts_tags')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts_tags) => {
      res.status(200).json(posts_tags)
    })
}

const getPostFromTag = (req, res, next) => {
  return model.getPostFromTag(req.params.id)
    .then((data) => {
      console.log('controller call:',
        data)
      res.status(200)
    })
}



module.exports = { getAll, getPostFromTag }