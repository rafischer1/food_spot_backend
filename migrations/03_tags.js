exports.up = (knex, Promise) => {
  return knex.schema.createTable('tags', (table) => {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments() // id field, auto PK
    table.string('name').notNullable()
  })
}
exports.down = (knex, Promise) => {
  return knex.schema.dropTableIfExists('tags')
}