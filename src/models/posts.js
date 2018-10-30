// Model
const knex = require('../../knex')

//get all works!
const getAll = () => {
  return knex('posts')
    .then(posts => {
      return posts
    })
    .catch(err => Promise.reject(err))
}

//works!
const getPostsByUserId = (user_id) => {

  return knex('posts')
    .where('user_id', user_id)
    .then(post => {
      return post[0]
    })
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

//works!
const updateOne = (id, body) => {
  let newPost = {}
  if (body.foodName) {
    newPost.foodName = body.foodName
  }
  if (body.address) {
    newPost.address = body.address
  }
  if (body.state) {
    newPost.state = body.state
  }
  if (body.zipcode) {
    newPost.zipcode = body.zipcode
  }
  if (body.country) {
    newPost.country = body.country
  }
  if (body.imageUrl) {
    newPost.imageUrl = body.imageUrl
  }
  if (body.promoted) {
    newPost.promoted = body.promoted
  }
  if (body.startTime) {
    newPost.startTime = body.startTime
  }
  if (body.endTime) {
    newPost.endTime = body.endTime
  }
  return knex('posts')
    .where('id', id)
    .then(data => {
      knex('posts')
        .where('id', id)
        .limit(1)
        .update(newPost)
        .returning("*")
        .then(data => {
          res.json(data[0])
        })
    })
    .catch(err => {
      next(err)
    })
}

// works!
const deleteOne = (id) => {
  return knex('posts')
    .where('id', id)
    .del()
    .returning('*')
    .then(post => post[0])
    .catch(err => Promise.reject(err))
}


module.exports = {
  getAll,
  getPostsByUserId,
  create,
  updateOne,
  deleteOne
}