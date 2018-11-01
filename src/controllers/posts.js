// Controller
require('dotenv').config()
const model = require('../models/posts')
const jwt = require('jsonwebtoken')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
}

const getPostsByUserId = (req, res, next) => {
  console.log("in getpostbyuserid controller");
  let myId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
  return model.getPostsByUserId(myId)
    .catch(error => {
      return next({
        status: 404,
        message: error
      })
    })
    .then(data => {
      console.log(data)
      res.json(data)
    })
}

const create = (req, res, next) => {
  let myId
  if (jwt.verify(req.cookies.token, process.env.TOKEN_SECRET)) {
    myId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
  }
  return model.create(myId, req.body)
    .then(data => {
      res.status(201).json(data)
    })
    .catch(errors => {
      return next({
        status: 400,
        message: `Could not create new post`,
        errors: errors
      })
    })
}

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
  getPostsByUserId,
  updateOne,
  deletePost
}
