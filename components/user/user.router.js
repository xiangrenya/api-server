const express = require('express');

const router = express.Router();
const userRequired = require('../../middlewares/token');
const {
  createUser,
  authentication,
  getUserList,
  getUserDetail,
  updateUser,
  deleteUser,
} = require('./user.controller');

router.get('/users', userRequired, getUserList);
router.get('/users/:userId', userRequired, getUserDetail);
router.post('/users', createUser);
router.post('/authentication', authentication);
router.put('/users/:userId', userRequired, updateUser);
router.delete('/users/:userId', userRequired, deleteUser);

module.exports = router;
