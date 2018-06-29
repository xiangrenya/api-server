const crypto = require('crypto');

/**
 * 用md5算法加密password
 * @param {string} password - 明文密码
 * @returns {string} - md5加密后的密码
 */

exports.encryptPassword = password => crypto.createHash('md5').update(password).digest('hex');

/**
 * 判读密码是否有效
 * @param {string} password - 明文密码
 * @param {string} encryptedPassword - 加密后的密码
 * @returns {boolean} - 密码是否有效 true | false
 */
exports.isvalidPassword = (password, encryptedPassword) => crypto.createHash('md5').update(password).digest('hex') === encryptedPassword;
