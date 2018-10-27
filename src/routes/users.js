var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/users')

router.get('/', ctrl.getAll)
router.post('/', ctrl.create)
router.delete('/', ctrl.deleteOne)

module.exports = router;