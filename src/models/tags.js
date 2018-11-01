// Model
const knex = require('../../knex')

const getAll = (req, res, next) => {
  return knex('tags')
    .then(tags => {
      // console.log('model tags:', tags)
      return tags
    })
    .catch(err => Promise.reject(err))
}

const getOneTag = (id) => {
  return knex('tags')
    .where('id', id)
    .then(tag => {
      return tag[0]
    })
    .catch(err => Promise.reject(err))
}

const create = (body) => {
  return knex('tags')
    .insert(body)
    .returning('*')
    .then(tag => tag[0])
    .catch(err => Promise.reject(err))
}

module.exports = { getAll, create, getOneTag }
