const express = require('express');
const tomatoRoutes = require('./tomato.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.use('/tomatoes', tomatoRoutes);

module.exports = router;
