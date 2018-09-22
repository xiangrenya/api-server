/**
 * todo: 添加邮箱格式验证
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    match: [/^[1-9][0-9]{10}$/, '手机号码格式不正确'],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);

