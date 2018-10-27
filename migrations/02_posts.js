exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('foodName').notNullable()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.integer('zipcode').notNullable()
    table.string('country').notNullable().defaultTo('USA')
    table.string('imageUrl')
    table.boolean('promoted')
    table.dateTime('startTime')
    table.dateTime('endTime')
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}