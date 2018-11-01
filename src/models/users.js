// Model
const knex = require('../../knex')

const getAll = (limit) => {
  return knex('users')
    .then(users => {
      console.log('model users:', users)
      return users
    })
    .catch(err => Promise.reject(err))
}

const create = (body) => {
  return knex('users')
    .insert(body)
    .returning('*')

    .then(user => user[0])
    .catch(err => Promise.reject(err))
}

const getOneUser = (oauthId) => {
  return knex('users')
    .where('oauthId', oauthId)
    .then(user => {
      return user[0]
    })
    .catch(err => {
      console.log(`Model route error: ${err}`)
      Promise.reject(err)
    })
}

const checkUser = (githubId) => {
  return knex('users')
    .where('oauthId', githubId)
    .then(user => {
      return user[0]
    })
}

const getPostsByUser = () => {
  console.log('getPostsByUser')
}

const deleteOne = (id) => {
  return knex('users')
    .where('id', id)
    .del()
    .returning('*')
    .then(user => {
      return user[0]
    })
    .catch(err => Promise.reject(err))
}

module.exports = { getAll, create, deleteOne, getOneUser, checkUser } // Model
