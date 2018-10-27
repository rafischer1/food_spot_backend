const model = require('../models/posts')

const getAll = (req, res, next) => {
  const limit = req.query.limit
  const data = model.getAll(limit)
  res.status(200).json({ data })
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