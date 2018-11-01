// Model
const knex = require('../../knex')

const getAll = () => {
  return knex('posts')
    .then(posts => {
      return posts
    })
    .catch(err => Promise.reject(err))
}

const getOnePost = (id) => {
  return knex('posts')
    .select('*')
    .where('id', id)
    .then(res => res)
    .catch(err => {
      Promise.reject(err)
    })
}

const getPostsByUserId = (user_id) => {
  return knex('posts')
    .where('user_id', user_id)
    .then(post => {
      return post
    })
    .catch(err => Promise.reject(err))
}

const create = (id, body, tags) => {
  let myobj = body
  myobj.user_id = id
  return knex('posts')
    .insert(myobj)
    .returning('id')
    .then(post => {
      console.log('model .then post:', post[0])
      return post[0]
    })
    .catch(err => {
      console.log(`posts post ${err}`)
    })
}

const updateOne = (id, body) => {
  let newPost = {}
  if (body.eventName) {
    newPost.eventName = body.eventName
  }
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
  if (body.date) {
    newPost.date = body.date
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
  deleteOne,
  getOnePost
}
