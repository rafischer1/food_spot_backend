// Model
const knex = require('../../knex')

const getAll = (req, res, next) => {
  return knex('tags')
    .then(tags => {
      console.log('model tags:', tags)
      return tags
    })
    .catch(err => Promise.reject(err))
}

const getOneTag = (id) => {
  return knex('tags')
    .where('id', id)
    .then(tag => tag[0])
    .catch(err => Promise.reject(err))
}

const create = (body) => {
  return parseBody(body)
    .then(fields => {
      return knex('tags')
        .insert(fields)
        .returning('*')
    })
    .then(tag => tag[0])
    .catch(err => Promise.reject(err))
}

// let response = {}
// if (!name) {
//   errors.push('name is required')
//   response = { errors }
// } else {
//   response = tagData
// }
// 
// return response
// }
// 
// const deleteOne = (body) => {
//   console.log('tags route delete')
// }

module.exports = { getAll, create, }