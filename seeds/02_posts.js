<<<<<<< HEAD
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
=======

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          foodName: 'Pizza',
          user_id: 1,
          address: '1023 Walnut St'
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png',
          promoted: true,
        },
        {
          id: 2,
          foodName: 'Bagels',
          user_id: 2,
          address: '1023 Walnut St'
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://prods3.imgix.net/images/articles/2017_09/non-feat-best-bagels-online-yom-kippur.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=670',
          promoted: true,
        },
        {
          id: 3,
          foodName: 'Pancakes',
          user_id: 3,
          address: '1023 Walnut St'
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg',
          promoted: true,
        },
      ]);
    })
.then(() => {
     return knex.raw(
       `SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));`)
   })
};
>>>>>>> posts-seed
