const User = require('../models/user.model');
const crypto = require('../utils/crypto');

/**
 * 获取用户详情挂到req对象的属性，供查询、更新、删除用
 */
const load = (req, res, next, id) => {
  User.get(id)
    .then((user) => {
      req.user = user;
      return next();
    })
    .catch(e => next(e));
};

/**
 * 获取用户详情
 * @returns {User}
 */
const get = (req, res) => res.json(req.user);

/**
 * 注册用户
 * @property {string} req.body.username - 用户名
 * @property {string} req.body.password - 密码
 * @property {string} req.body.mobile - 手机号
 * @property {string} req.body.email - 邮箱
 * @returns {User}
 */
const signup = async (req, res, next) => {
  const {
    username, password, mobile, email,
  } = req.body;
  try {
    const isRepeatedUserName = await User.isRepeatedUserName(username);
    if (!isRepeatedUserName) {
      const user = new User({
        username,
        password: crypto.encryptPassword(password),
        mobile,
        email,
      });
      user.save().then(savedUser => res.json(savedUser));
    }
  } catch (e) {
    next(e);
  }
};

/**
 * 用户登录
 * @property {string} req.body.username - 用户名
 * @property {string} req.body.password - 密码
 * @returns {User}
 */
const login = (req, res, next) => {
  const {
    username, password,
  } = req.body;
  User.login(username, crypto.encryptPassword(password))
    .then(user => res.json(user))
    .catch(e => next(e));
};

/**
 * 更新用户信息（部分更新）
 * @property {string} req.user - 要更新的用户
 * @property {string} req.body - 要更新的键值对
 * @returns {User}
 */
const update = (req, res, next) => {
  const { user } = req;
  const { password, mobile, email } = req.body;
  const updateBody = { password, mobile, email };
  Object.keys(updateBody).forEach((key) => {
    if (key) {
      user[key] = key === 'password' ? crypto.encryptPassword(password) : updateBody[key];
    }
  });
  user.save()
    .then(updatedUser => res.json(updatedUser))
    .catch(e => next(e));
};

/**
 * 获取用户列表（带分页）
 * @property {number} req.query.offset - 偏移量
 * @property {number} req.query.limit - 每页个数.
 * @returns {User[]}
 */
const list = (req, res, next) => {
  const { limit = 5, offset = 0 } = req.query;
  User.list({ limit, skip: offset })
    .then(users => res.json(users))
    .catch(e => next(e));
};

/**
 * 注销用户
 * @returns {User}
 */
const remove = (req, res, next) => {
  const { user } = req;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
};

module.exports = {
  load,
  get,
  signup,
  login,
  update,
  list,
  remove,
};
