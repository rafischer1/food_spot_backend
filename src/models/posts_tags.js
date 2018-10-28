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

      postID = postIds[0].post_id
      console.log('postsModel.getOnePost(1):', postsModel.getOnePost(1))
      // return postsModel.getOnePost(postId)
      // return Promise.all(postIds.map(record => {
      //   return postsModel.getOnePost(record["post_id"])
      // }))
    })
    // .then(post => {
    //   console.log('postID in .then', postId)
    //   return postsModel.getOnePost(postId)
    //   //   .then(tag => {
    //   //     posts.tags = tag
    //   //     return tag
    //   //   })
    // })
    .catch((err) => {
      console.log(`error: ${err}`)
    })
}

module.exports = { getAll, getPostFromTag }