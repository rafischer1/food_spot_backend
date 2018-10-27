// Model
const getAll = (limit) => {
  return limit ? users.slice(0, limit) : users
}

const create = (body) => {
  const errors = []
  let userData = {
    firstName: body.firstName,
    lastName: body.lastName,
    location: body.location,
    promoter: body.promoter,
    avatar: body.avatar
  }

  let response = {}
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else {
    response = userData
  }

  return response
}

const deleteOne = (body) => {
  console.log('Users route delete')
}

module.exports = { getAll, create, deleteOne } // Model