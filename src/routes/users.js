var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/users')

router.get('/', ctrl.getAll)
router.get('/:oauthId', ctrl.getOneUser)
router.post('/', ctrl.create)
router.delete('/:oauthId', ctrl.deleteOne)

module.exports = router;
