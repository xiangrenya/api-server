const createError = require('http-errors');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    match: [/^[1-9][0-9]{10}$/, '手机号码格式不正确'],
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
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

UserSchema.method({
});

UserSchema.statics = {

  /**
   * 获取用户详情
   * @param {ObjectId} id - 用户id.
   * @returns {Promise<User, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = createError(404, '用户不存在');
        return Promise.reject(err);
      });
  },

  /**
   * 判断用户名是否存在
   * @param {string} username - 用户名
   * @returns {Promise<User, APIError>}
   */
  isRepeatedUserName(username) {
    return this.findOne({ username })
      .exec()
      .then((user) => {
        if (user) {
          const err = createError(500, '用户名已存在');
          return Promise.reject(err);
        }
        return false;
      });
  },

  /**
   * 验证用户名密码是否匹配
   * @param {string} username - 用户名
   * @param {string} password - 加密后密码
   * @returns {Promise<User, APIError>}
   */
  login(username, password) {
    return this.findOne({ username, password })
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = createError(500, '用户或密码错误');
        return Promise.reject(err);
      });
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  },
};

module.exports = mongoose.model('User', UserSchema);

