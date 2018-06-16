const express = require('express');
const {
  load, get, create, update, list, remove,
} = require('../controllers/tomato.controller');

const router = express.Router();

router.route('/')
  .get(list)
  .post(create);

router.route('/:postId')
  .get(get)
  .put(update)
  .delete(remove);

router.param('postId', load);

module.exports = router;
