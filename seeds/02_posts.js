exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function() {
      // Inserts seed entries
      return knex('posts').insert([{
          id: 1,
          eventName: 'Free Food',
          foodName: 'Pizza',
          user_id: 1,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://www.cicis.com/media/1176/pizza_trad_pepperonibeef.png',
          promoted: true,
          date: '2017-01-13'
        },
        {
          id: 2,
          eventName: 'Breakfast on Walnut',
          foodName: 'Bagels',
          user_id: 3,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://prods3.imgix.net/images/articles/2017_09/non-feat-best-bagels-online-yom-kippur.jpg?auto=format%2Ccompress&ixjsv=2.2.3&w=670',
          promoted: true,
          date: '2018-02-03'
        },
        {
          id: 3,
          eventName: 'Cooking Classes and Pancakes',
          foodName: 'Pancakes',
          user_id: 4,
          address: '1023 Walnut St',
          city: 'Boulder',
          state: 'Colorado',
          zipcode: '80302',
          imageUrl: 'https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg',
          promoted: true,
          date: '2018-10-31'
        },
      ]);
    })
    .then(() => {
      return knex.raw(
        `SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));`)
    })
};
