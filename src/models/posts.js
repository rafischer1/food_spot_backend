// Model
const knex = require('../../knex')
const getAll = (limit) => {
  return limit ? posts.slice(0, limit) : posts
}

const create = (body) => {
  const errors = []
  let postData = {
    foodName: body.foodName,
    address: body.address,
    city: body.city,
    state: body.state,
    zipcode: body.zipcode,
    country: body.country,
    imageUrl: body.imageUrl,
    promoted: body.promoted,
    startTime: body.startTime,
    endTime: body.endTime
  }

  let response = {}
  if (!name) {
    errors.push('name is required')
    response = { errors }
  } else {
    response = postData
  }

  return response
}

const deleteOne = (body) => {
  console.log('Gotta write a delete')
}

module.exports = { getAll, create, deleteOne }