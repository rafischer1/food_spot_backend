const knex = require('../../knex')
const postsModel = require('../models/posts')

const tagsModel = require('../models/tags')

//getAll works!
const getAll = (limit) => {
  return knex('posts_tags')
    .then(data => data)
    .catch(err => Promise.reject(err))
}

//get post from tag
const getPostFromTag = (id) => {
  let postId
  return knex('posts_tags')
    .select('post_id')
    .where('tag_id', id)
    .then(postIds => {
      console.log(`postsIDs knex call:`, postIds[0])
      postId = postIds[0].post_id
      return postsModel.getOnePost(postId)
    })
    .catch((err) => {
      console.log(`error: ${err}`)
    })
}

module.exports = { getAll, getPostFromTag }