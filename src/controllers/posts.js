const model = require('../models/posts')

const getAll = (req, res, next) => {
  console.log('getAll')
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

// Works!
const updateOne = (req, res, next) => {
  return model.updateOne(req.params.id, req.body)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      const error = new Error('Failed to update post')
      error.status = 503
      error.caught = err
      return next(error)
    })
}

// works!
const deletePost = (req, res, next) => {
  return model.deleteOne(req.params.id)
    .then(post => res.status(200).json(post))
    .catch(err => {
      const error = new Error('Failed to delete post')
      error.status = 503
      error.caught = err
      return next(error)
    })
}

module.exports = {
  getAll,
  create,
  getOnePost,
  updateOne,
  deletePost
}
// Controller