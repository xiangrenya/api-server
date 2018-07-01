const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const cors = require('cors');
const indexRouter = require('./routes/index.route');
const config = require('./config/');
// 连接mongodb数据库
mongoose.connect(config.mongodb.uri);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongodb.uri}`);
});

const app = express();

// 配置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// 启用跨域访问
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true,
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// 异常处理
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.status(err.status || 500);
  // render the error page
  // res.render('error');

  res.status(err.status || 500).json(err.message);
});

module.exports = app;
