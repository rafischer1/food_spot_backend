// Model
const knex = require('../../knex')

const getOnePost = (id) => {
  return knex('posts')
    .select('*')
    .where('id', id)
    .then(res => res)
    .catch(err => {
      Promise.reject(err)
    })
}

module.exports = { getOnePost }