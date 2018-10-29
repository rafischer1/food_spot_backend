const model = require('../models/tags_posts')

const getTagsFromPost = (req, res, next) => {
  return model.getTagsFromPost(req.params.id)
    .then((data) => {
      res.status(200).json(data)
    })
}

module.exports = { getTagsFromPost }