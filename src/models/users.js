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

const checkUser = (githubId) => {
  return knex('users')
    .where('oauthId', githubId)
    .then(user => {
      console.log('user in user model:', user)
      // return user[0]
      if(user.length > 0){
        return true
      } else {
        return false
      }
    })
}

const updatePost = () => {
  console.log('updatePost')
}

// works!
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

module.exports = { getAll, create, deleteOne, getOneUser, updatePost, checkUser } // Model
