//controller tags
const model = require('../models/tags')

//works!
const getAll = (req, res, next) => {
  return model.getAll()
    .then((tags) => {
      res.status(200).json(tags)
    })
}
//works!
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

//works!
const getOneTag = (req, res, next) => {
  return model.getOneTag(req.params.id)
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

const deleteOne = (req, res, next) => {
  //tags stretch goal for tag creation
}

module.exports = { getAll, create, getOneTag, deleteOne }