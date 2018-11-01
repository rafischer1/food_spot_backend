exports.up = function(knex, Promise) {
  return knex.schema.createTable('posts', function(table) {
    // TABLE COLUMN DEFINITIONS HERE
    table.increments()
    table.string('eventName')
    table.string('foodName').notNullable()
    table.integer('user_id')
    table.foreign('user_id').references('users.id').onDelete('CASCADE')
    table.string('address').notNullable()
    table.string('city').notNullable()
    table.string('state').notNullable()
    table.integer('zipcode').notNullable()
    table.string('country').notNullable().defaultTo('USA')
    table.string('imageUrl').defaultTo('https://www.flickr.com/photos/145857699@N08/31780527108/in/dateposted-public/')
    table.boolean('promoted')
    table.dateTime('startTime').notNullable()
    table.dateTime('endTime').notNullable()
    table.date('date').notNullable()
    table.timestamps(true, true)
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('posts')
}