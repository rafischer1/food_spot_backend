var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/posts')

router.get('/', ctrl.getAll)
router.get('/:user_id', ctrl.getPostsByUserId)
router.post('/', ctrl.create)
router.patch('/:id', ctrl.updateOne)
router.delete('/:id', ctrl.deletePost)


module.exports = router;