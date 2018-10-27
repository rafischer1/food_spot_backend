var express = require('express');
var router = express.Router();
const knex = require('../../knex')
const ctrl = require('../controllers/tags')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)

module.exports = router;
