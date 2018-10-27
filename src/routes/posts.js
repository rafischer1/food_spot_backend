var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/posts')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOnePost)
router.post('/', ctrl.create)
router.patch('/', ctrl.patch)
router.delete('/', ctrl.deleteOne)

module.exports = router;