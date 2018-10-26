exports.up = (knex, Promise) => {
  return knex.schema.createTable('posts_tags', (table) => {
    table.increments('id') // id field, auto PK
    table.integer('post_id').notNullable()
    table.integer('tag_id').notNullable()
    table.foreign('post_id').references('posts.id').onDelete('CASCADE')
    table.foreign('tag_id').references('tags.id').onDelete('CASCADE')
  })
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('posts_tags')
}