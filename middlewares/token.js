const jwt = require('jsonwebtoken');
const { jwt: { secret } } = require('../config');

const userRequired = (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('没有提供token');
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        res.status(401).send('无效的token');
      } else {
        res.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = userRequired;
