// Model
const knex = require('../../knex')

//get all works!
const getAll = (req, res, next) => {
  return knex('tags')
    .then(tags => {
      console.log('model tags:', tags)
      return tags
    })
    .catch(err => Promise.reject(err))
}

//works!
const getOneTag = (id) => {
  return knex('tags')
    .where('id', id)
    .then(tag => tag[0])
    .catch(err => Promise.reject(err))
}

//create works!
const create = (body) => {
  return knex('tags')
    .insert(body)
    .returning('*')

    .then(tag => tag[0])
    .catch(err => Promise.reject(err))
}



module.exports = { getAll, create, getOneTag }