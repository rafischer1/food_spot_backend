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
// const errors = []
// let userData = {
//   firstName: body.firstName,
//   lastName: body.lastName,
//   location: body.location,
//   promoter: body.promoter,
//   avatar: body.avatar
// }
// 
// let response = {}
// if (!name) {
//   errors.push('name is required')
//   response = { errors }
// } else {
//   response = userData
// }
// 
// return response


const deleteOne = (body) => {
  console.log('Users route delete')
}

module.exports = { getAll, create, deleteOne } // Model