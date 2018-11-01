var express = require('express');
var router = express.Router();
const ctrl = require('../controllers/post_id')

router.get('/:post_id', ctrl.getPostbyId)


module.exports = router;