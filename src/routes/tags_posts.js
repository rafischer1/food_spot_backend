var express = require('express');
var router = express.Router();

const ctrl = require('../controllers/tags_posts')

router.get('/:id', ctrl.getTagsFromPost)

module.exports = router