// Model
const getAll = (limit) => {
  return limit ? tags.slice(0, limit) : tags
}

const create = (body) => {
  const errors = []
  let tagData = {
    name: body.name
  }

  let response = {}
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else {
    response = tagData
  }

  return response
}

module.exports = { getAll, create }