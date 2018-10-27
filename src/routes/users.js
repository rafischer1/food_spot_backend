var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/users')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOneUser)
router.post('/', ctrl.create)
router.delete('/', ctrl.deleteOne)

module.exports = router;