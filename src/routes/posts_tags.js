var express = require('express');
var router = express.Router();
const knex = require('../../knex')

router.get('/', ctrl.getAll)

module.exports = router;
