const jwt = require('jsonwebtoken');
const User = require('./user.model');
const crypto = require('../../utils/crypto');
const {
  jwt: { secret, expiresIn },
} = require('../../config');

/**
 * 获取用户列表
 * 带分页、模糊查询
 * todo: 增加total总计
 */
const getUserList = (req, res, next) => {
  const { userName } = req.query;
  let { page = 1, perPage = 20 } = req.query;
  page = Number(page);
  perPage = Number(perPage);
  const reg = new RegExp(userName, 'i');
  User.find({ userName: { $regex: reg } })
    .sort({ createDate: -1 })
    .skip((page - 1) * perPage)
    .limit(perPage)
    .select('_id userName mobile email createDate updateDate')
    .exec((err, users) => {
      if (err) return next(err);
      res.send(users);
    });
};

/**
 * 查看用户详情
 */
const getUserDetail = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .select('userName mobile email createDate updateDate')
    .exec((err, user) => {
      if (err) return next(err);
      res.send(user);
    });
};

/**
 * 删除用户
 * todo: 删除成功后，不能再删除
 */
const deleteUser = (req, res, next) => {
  const { userId } = req.params;
  User.findByIdAndDelete(userId).exec((err) => {
    if (err) return next(err);
    res.send('删除成功！');
  });
};

/**
 * 注册用户
 * todo: 邮箱验证、消灭嵌套的写法
 */
const createUser = async (req, res, next) => {
  const { userName, email, password } = req.body;
  User.findOne({ userName }).exec((err, user) => {
    if (user) return res.send('用户名已存在');
    const newUser = new User({
      ...req.body,
      password: crypto.encryptPassword(password),
    });
    newUser.save((err, savedUser) => {
      if (err) return next(err);
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn,
      });
      const { _id, createDate, updateDate } = savedUser;
      res.send({
        _id,
        userName,
        email,
        createDate,
        updateDate,
        token,
      });
    });
  });
};

/**
 * 更新用户信息
 * 包含基本信息、重置密码
 */
const updateUser = (req, res, next) => {
  const {
    params: { userId },
    body,
  } = req;
  const { password } = body;
  if (password) {
    Object.assign(body, {
      password: crypto.encryptPassword(password),
    });
  }
  User.findByIdAndUpdate(userId, body).exec((err, result) => {
    if (err) return next(err);
    res.send('更新成功！');
  });
};

/**
 * 用户认证
 * 用户名和密码验证
 */
const authentication = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    if (err) return next(err);
    if (!user) return res.send('邮箱或密码错误');
    const {
      password: ecryptedPassword, _id, userName, mobile, createDate, updateDate,
    } = user;
    if (crypto.encryptPassword(password) === ecryptedPassword) {
      const payload = { email };
      const token = jwt.sign(payload, secret, {
        expiresIn,
      });
      res.send({
        _id,
        userName,
        email,
        mobile,
        createDate,
        updateDate,
        token,
      });
    }
  });
};

module.exports = {
  createUser,
  authentication,
  getUserList,
  getUserDetail,
  updateUser,
  deleteUser,
};
