const Tomato = require('../models/tomato.model');
/**
 * Load tomato and append to req.
 */
function load(req, res, next, id) {
  Tomato.get(id)
    .then((tomato) => {
      req.tomato = tomato; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get tomato
 * @returns {Tomato}
 */
function get(req, res) {
  return res.json(req.tomato);
}

/**
 * Create new tomato
 * @property {string} req.body.username - The username of tomato.
 * @property {string} req.body.mobileNumber - The mobileNumber of tomato.
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
 * Update existing tomato
 * @property {string} req.body.username - The username of tomato.
 * @property {string} req.body.mobileNumber - The mobileNumber of tomato.
 * @returns {Tomato}
 */
function update(req, res, next) {
  const { tomato } = req;
  tomato.username = req.body.username;
  tomato.mobileNumber = req.body.mobileNumber;

  tomato.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get tomato list.
 * @property {number} req.query.skip - Number of tomatoes to be skipped.
 * @property {number} req.query.limit - Limit number of tomatoes to be returned.
 * @returns {Tomato[]}
 */
function list(req, res, next) {
  const { limit = 5, skip = 0 } = req.query;
  Tomato.list({ limit, skip })
    .then(tomatoes => res.json(tomatoes))
    .catch(e => next(e));
}

/**
 * Delete tomato.
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
