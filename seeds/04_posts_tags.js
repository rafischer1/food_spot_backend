exports.seed = (knex, Promise) => {
  return knex('posts_tags').del()
    .then(() => {
      return knex('posts_tags').insert([{
            id: 1,
            post_id: 1,
            tag_id: 3
          },
          {
            id: 2,
            post_id: 2,
            tag_id: 1
          }
        ])
        .then(() => {
          return knex.raw("SELECT setval('posts_tags_id_seq', (SELECT MAX(id) FROM posts_tags));")
        })
    })
}