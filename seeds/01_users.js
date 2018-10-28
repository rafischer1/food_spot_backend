exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
          { id: 1, firstName: 'Galvanize', lastName: '', location: 'Boulder, CO', promoter: true, avatar: 'https://www.bootcamps.in/wp-content/uploads/2013/01/galvanize_logo_orange_bg_200x200_360.jpg' },
          { id: 2, firstName: 'Pete', lastName: 'Silva', location: 'Boulder, CO', promoter: false, avatar: '' },
          { id: 3, firstName: 'Artie', lastName: 'Fischer', location: 'Boulder, CO', promoter: false, avatar: '', oauthId: 39342327 }
        ])
        .then(function() {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
        })
    })
}