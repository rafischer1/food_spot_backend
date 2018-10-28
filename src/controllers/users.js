// Controller
const model = require('../models/users')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((users) => {
      res.status(200).json(users)
    })
}

//works!
const getOneUser = (req, res, next) => {
  return model.getOneUser(req.params.id)
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
        message: `Could not create new user`,
        errors: errors
      })
    })
    .then(data => {
      res.status(201).json(data)
    })
}


// works!
const deleteOne = (req, res, next) => {
  return model.deleteOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => {
      const error = new Error('Failed to delete user')
      error.status = 503
      error.caught = err
      return next(error)
    })
}

module.exports = { getAll, create, getOneUser, deleteOne }