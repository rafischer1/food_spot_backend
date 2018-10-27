var express = require('express');
var router = express.Router();
const knex = require('../../knex')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
//delete for tags??
router.delete('/', ctrl.delete)

module.exports = router;