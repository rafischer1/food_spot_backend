const knex = require('../../knex')
const getAll = (limit) => {
  return knex('posts_tags')
    .then(data => data)
    .catch(err => Promise.reject(err))
}

module.exports = { getAll }