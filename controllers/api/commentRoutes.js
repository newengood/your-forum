const router = require('express').Router();
const { Comment, User, Post, Topic, Group } = require('../../models');
const withAuth = require('../../utils/auth');

/* route to create a new comment
  Request: { text, post_id } */
router.post('/', withAuth, async (req, res) => {
	try {
		const newComment = await Comment.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to delete comment
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!commentData) {
			return res
				.status(404)
				.json({ message: 'No comment found with this id!' });
		}

		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async (req, res) => {
	try {
		const newComment = await Comment.create(req.body);

		res.status(200).json(newComment);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const comments = await Comment.findAll({
			include: { all: true },
		});

		res.status(200).json(comments);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const commentData = await Comment.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!commentData) {
			return res
				.status(404)
				.json({ message: 'No comment found with this id!' });
		}

		res.status(200).json(commentData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
