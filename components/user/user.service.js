const User = require('./user.model');
const { encryptPassword } = require('../../utils');

/**
 * 获取用户列表
 * 带分页、模糊查询
 * todo: 增加total总计
 * @param {string} userName 用户名
 * @param {number} page 页码
 * @param {number} perPage 每页数量
 * @returns {array} 返回用户列表数组
 */
const getUserList = (userName, page, perPage) => {
  const reg = new RegExp(userName, 'i');
  return User.find({ userName: reg })
    .sort({ createDate: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .select('_id userName mobile email createDate updateDate');
};

/**
 * 统计用户数量
 * @param {string} userName 用户名
 */
const getUserCount = (userName) => {
  const reg = new RegExp(userName, 'i');
  return User.find({ userName: reg }).count();
};

/**
 * 查看用户详情
 * @param {string} userId 用户id
 * @returns {Promise}
 */
const getUserDetail = userId =>
  User.findById(userId).select('userName mobile email createDate updateDate');

/**
 * 删除用户
 * @param {string} userId 用户id
 * @returns {Promise}
 * todo: 删除成功后，不能再删除
 */
const deleteUser = userId => User.findByIdAndDelete(userId);

/**
 * 判断用户名是否存在
 * @param {string} userName 用户名
 * @return {boolean} 用户名是否注册过
 */
const isUserNameSignuped = async (userName) => {
  const user = await User.findOne({ userName });
  return Boolean(user);
};

/**
 * 判断邮箱是否存在
 * @param {string} email 邮箱
 * @return {boolean} 邮箱是否注册过
 */
const isEmailSignuped = async (email) => {
  const user = await User.findOne({ email });
  return Boolean(user);
};

/**
 * 注册用户
 * todo: 邮箱验证、消灭嵌套的写法
 * @param {string}} userName 用户名
 * @param {string}} email 邮箱
 * @param {string}} password 明文密码
 * @returns {Promise} 用户详情
 */
const createUser = (userName, email, password) => {
  const user = new User({
    userName,
    email,
    password: encryptPassword(password),
  });
  return user.save();
};

/**
 * 修改用户信息
 * @param {string} userId 用户id
 * @param {object} body 包含更新字段的对象，如基本信息、重置密码
 * @returns {Promise}
 */
const updateUser = (userId, body) => {
  // const fields = 'userName,email,mobile,password'.split(',');
  // const validFields = body.keys().every(key => fields.includes(key));
  // if (!validFields) throw new Error('无效的字段!');
  const { password } = body;
  if (password) {
    Object.assign(body, {
      password: encryptPassword(password),
    });
  }
  return User.findByIdAndUpdate(userId, body);
};

/**
 * 邮箱密码登录系统
 * @param {string} email 邮箱账号
 * @param {string} password 明文密码
 * @returns {Promise} 用户详情
 */
const authentication = async (email, password) =>
  User.findOne({ email, password: encryptPassword(password) });

module.exports = {
  isUserNameSignuped,
  isEmailSignuped,
  createUser,
  authentication,
  getUserList,
  getUserCount,
  getUserDetail,
  updateUser,
  deleteUser,
};
