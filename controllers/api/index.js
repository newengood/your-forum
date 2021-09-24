const router = require('express').Router();
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');

router.use('/users', userRoutes);
router.use('/grups', groupRoutes);
// insert routes here: categories? posts?

module.exports = router;
