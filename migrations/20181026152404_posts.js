exports.up = function(knex, Promise) {
return knex.schema.createTable('posts', function(table) {
 // TABLE COLUMN DEFINITIONS HERE
 table.increments()
 table.string(foodName).notNullable()
 table.integer('user_id')
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
 // OR
 // table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'))
 // table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'))
})
}
exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('posts')
}
