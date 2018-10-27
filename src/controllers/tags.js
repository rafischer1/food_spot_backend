//controller tags
const model = require('../models/tags')


const getAll = (req, res, next) => {
  return model.getAll()
    .then((tags) => {
      res.status(200).json(tags)
    })
}

const create = (req, res, next) => {
  return model.create(req.body)
    .catch(errors => {
      return next({
        status: 400,
        message: `Could not create new tag`,
        errors: errors
      })
    })
    .then(data => {
      res.status(201).json(data)
    })
}

const deleteOne = (req, res, next) => {
  //tags stretch goal for tag creation
}

module.exports = { getAll, create, deleteOne }
// Controller// Controller