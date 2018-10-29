var express = require('express');
var router = express.Router();
const knex = require('../../knex')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { session: req.session, user: req.user });
});

module.exports = router;