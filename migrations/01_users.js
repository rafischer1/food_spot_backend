exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.varchar('name').notNullable().defaultTo('')
    // table.varchar('lastName').notNullable().defaultTo('')
    table.string('location', 255).defaultTo('')
    table.boolean('promoter').notNullable().defaultTo('')
    table.string('avatar').defaultTo('')
    table.integer('oauthId')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')
}
