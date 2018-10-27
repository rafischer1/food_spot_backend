const model = require('../models/posts')

const getAll = (req, res, next) => {
  return model.getAll()
    .then((posts) => {
      res.status(200).json(posts)
    })
}

const create = (req, res, next) => {
  const result = model.create(req.body)

  if (result.errors) {
    return next({ status: 400, message: `Could not create new post`, errors: result.errors })
  }

  res.status(201).json({ data: result })
}

const patch = (req, res, next) => {

}

const deleteOne = (req, res, next) => {

}

module.exports = { getAll, create, patch, deleteOne }
// Controller