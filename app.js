const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index');
const userRouter = require('./components/user/user.router');
const config = require('./config');

// 连接mongodb数据库
mongoose.connect(config.mongodb.uri, { useNewUrlParser: true });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongodb.uri}`);
});

const app = express();

// 启用跨域访问
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 路由管理
app.use('/api', indexRouter);
app.use('/api', userRouter);

// 404处理
app.use((req, res, next) => {
  next(createError(404));
});

// 异常处理
app.use((err, req, res, next) => {
  res.status(err.status || 500).json(err.message);
});

module.exports = app;
