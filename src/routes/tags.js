var express = require('express');
var router = express.Router();
const knex = require('../../knex')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)

module.exports = router;