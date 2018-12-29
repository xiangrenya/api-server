const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {
  jwt: { secret, expiresIn },
} = require('../config');

/**
 * 返回签名后的token
 * @param {object} payload 加密的负载
 */
exports.signToken = payload => jwt.sign(payload, secret, {
  expiresIn,
});

/**
 * 用md5算法加密password
 * @param {string} password - 明文密码
 * @returns {string} - md5加密后的密码
 */

exports.encryptPassword = password => crypto.createHash('md5').update(password).digest('hex');
