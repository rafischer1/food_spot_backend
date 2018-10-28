// Model
const knex = require('../../knex')

//getAll works!
const getAll = (limit) => {
  return knex('users')
    .then(users => {
      console.log('model users:', users)
      return users
    })
    .catch(err => Promise.reject(err))
}

//create works!
const create = (body) => {

  return knex('users')
    .insert(body)
    .returning('*')

    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

//works!
const getOneUser = (id) => {
  return knex('users')
    .where('id', id)
    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

const updatePost = () => {
  console.log('updatePost')
}

const deleteOne = (body) => {
  console.log('Users route delete')
}

module.exports = { getAll, create, deleteOne, getOneUser, updatePost } // Model