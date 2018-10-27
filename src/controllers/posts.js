const model = require('../models/posts')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts) => {
      res.status(200).json(posts)
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

module.exports = { getAll, create, patch, deleteOne }
// Controller