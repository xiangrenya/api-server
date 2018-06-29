const express = require('express');
const {
  load, get, signup, login, update, list, remove,
} = require('../controllers/user.controller');

const router = express.Router();

router.route('/')
  .get(list);

router.route('/signup')
  .post(signup);

router.route('/login')
  .post(login);

router.route('/:userId')
  .get(get)
  .put(update)
  .delete(remove);

router.param('userId', load);

module.exports = router;
