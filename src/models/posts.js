// Model
const knex = require('../../knex')

//get all works!
const getAll = () => {
  return knex('posts')
    .then(posts => {
      console.log('model posts getALL:', posts)
      return posts
    })
    .catch(err => Promise.reject(err))
}

//works!
const getOnePost = (id) => {
  return knex('posts')
    .where('id', id)
    .then(post => post[0])
    .catch(err => Promise.reject(err))
}

//create works!
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

const deleteOne = (id) => {
  return knex('posts')
    .where('id', id)
    .del()
    .returning('*')
    .then(post => post[0])
    .catch(err => Promise.reject(err))
}
}

module.exports = { getAll, getOnePost, create, deletePost }