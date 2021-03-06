var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/posts_tags')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getPostFromTag)
router.post('/', ctrl.create)

module.exports = router;