const router = require('express').Router();
const userRoutes = require('./userRoutes');
const groupRoutes = require('./groupRoutes');
const topicRoutes = require('./topicRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const invitationRoutes = require('./invitationRoutes');

router.use('/users', userRoutes);
router.use('/groups', groupRoutes);
router.use('/topics', topicRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/invitations', invitationRoutes);

module.exports = router;
