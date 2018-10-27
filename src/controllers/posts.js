const model = require('../models/posts')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
}

//works!
const getOnePost = (req, res, next) => {
  return model.getOnePost(req.params.id)
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

const create = (req, res, next) => {
  return model.create(req.body)
    .catch(errors => {
      return next({
        status: 400,
        message: `Could not create new post`,
        errors: errors
      })
    })
    .then(data => {
      res.status(201).json(data)
    })
}

const patch = (req, res, next) => {

}

const deleteOne = (req, res, next) => {

}

module.exports = { getAll, create, patch, getOnePost, deleteOne }
// Controller