// Model
const knex = require('../../knex')
const getAll = () => {
  return knex('posts')
    .then(posts => {
      console.log('model posts getALL:', posts)
      return posts
    })
    .catch(err => Promise.reject(err))
}

const create = (body) => {
  console.log('model posts create body:', body)
  return knex('posts')
    .insert(body)
    .returning('*')
    .then(post => post[0])
    .catch(err => {
      console.log(`posts post ${err}`)
    })
}

const deleteOne = (body) => {
  console.log('Gotta write a delete')
}

module.exports = { getAll, create, deleteOne }