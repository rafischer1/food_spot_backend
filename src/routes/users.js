var express = require('express');
var router = express.Router();
const knex = require('../../knex')
const ctrl = require('../controllers/users')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.delete('/', ctrl.delete)

module.exports = router;
