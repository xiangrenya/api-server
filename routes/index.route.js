const express = require('express');
// const tomatoRoutes = require('./tomato.route');
// const userRoutes = require('./user.route');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('homepage');
});

// router.use('/tomatoes', tomatoRoutes);
// router.use('/users', userRoutes);

module.exports = router;
