exports.seed = function(knex, Promise) {

  return knex('posts').del()
    .then(() => {

      return knex('posts').insert([
          { id: 1, foodName: "test", address: "100 Main Street", city: "Boulder", state: 'CO', zipcode: 80304, country: 'USA', imageUrl: 'http://placehold.jp/150x150.png', promoted: false }
        ])
        .then(() => {

          return knex.raw("SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts))")
        })
    })
}

// new Date(year, month, date, hours, minutes, seconds, ms)