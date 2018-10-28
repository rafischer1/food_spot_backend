exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
          { id: 1, name: 'Galvanize', location: 'Boulder, CO', promoter: true, avatar: 'https://www.bootcamps.in/wp-content/uploads/2013/01/galvanize_logo_orange_bg_200x200_360.jpg' },
          { id: 2, name: 'Pete Silva', location: 'Boulder, CO', promoter: false, avatar: '' },
          { id: 3, name: 'Artie Fischer', location: 'Boulder, CO', promoter: false, avatar: '', oauthId: 39342327 }
          // { id: 4, name: 'Andy Chuong', location: 'Boulder, CO', promoter: false, avatar: 'https://avatars2.githubusercontent.com/u/23162835?v=4', oauthId: 23162835}
        ])
        .then(function() {
          return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))")
        })
    })
}
