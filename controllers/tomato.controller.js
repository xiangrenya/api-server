const Tomato = require('../models/tomato.model');
/**
 * 获取番茄详情挂到req对象的属性，供查询、更新、删除用
 */
function load(req, res, next, id) {
  Tomato.get(id)
    .then((tomato) => {
      req.tomato = tomato;
      return next();
    })
    .catch(e => next(e));
}

/**
 * 获取番茄详情
 * @returns {Tomato}
 */
function get(req, res) {
  return res.json(req.tomato);
}

/**
 * 创建番茄
 * @property {string} req.body.title - 标题.
 * @property {string} req.body.content - 内容
 * @property {string} req.body.duration - 持续时间
 * @property {string} req.body.status - 状态
 * @property {string} req.body.startTime - 开始时间
 * @returns {Tomato}
 */
function create(req, res, next) {
  const {
    title, content, duration, status,
  } = req.body;
  const startTime = status === 2 ? Date.now() : null;
  const tomato = new Tomato({
    title,
    content,
    duration,
    status,
    startTime,
  });
  tomato.save()
    .then(savedTomato => res.json(savedTomato))
    .catch(e => next(e));
}

/**
 * 更新番茄
 * @property {string} req.tomato - 要更新的番茄
 * @returns {Tomato}
 */
function update(req, res, next) {
  const { tomato } = req;
  const newTomato = {
    ...tomato,
    ...req.body,
  };
  newTomato.save()
    .then(updatedTomato => res.json(updatedTomato))
    .catch(e => next(e));
}

/**
 * 获取番茄列表（带分页）
 * @property {number} req.query.offset - 偏移量
 * @property {number} req.query.limit - 每页个数.
 * @returns {Tomato[]}
 */
function list(req, res, next) {
  const { limit = 5, offset = 0 } = req.query;
  Tomato.list({ limit, skip: offset })
    .then(tomatoes => res.json(tomatoes))
    .catch(e => next(e));
}

/**
 * 删除番茄
 * @returns {Tomato}
 */
function remove(req, res, next) {
  const { tomato } = req;
  tomato.remove()
    .then(deletedTomato => res.json(deletedTomato))
    .catch(e => next(e));
}

module.exports = {
  load, get, create, update, list, remove,
};
