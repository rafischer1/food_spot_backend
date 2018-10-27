var express = require('express');
var router = express.Router();
const knex = require('../../knex')
const ctrl = require('../controllers/posts')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.patch('/', ctrl.patch)
router.delete('/', ctrl.delete)

module.exports = router;
