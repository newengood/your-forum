const router = require('express').Router();
const { Post, Topic, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

/* route to create a new post
  Request: { title, content, topic_id } */
router.post('/', withAuth, async (req, res) => {
	try {
		const newPost = await Post.create({
			...req.body,
			user_id: req.session.user_id,
		});

		res.status(200).json(newPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to delete post
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!postData) {
			return res.status(404).json({ message: 'No post found with this id!' });
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async (req, res) => {
	try {
		const newPost = await Post.create(req.body);

		res.status(200).json(newPost);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const posts = await Post.findAll({
			include: { all: true },
		});

		res.status(200).json(posts);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const postData = await Post.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!postData) {
			return res.status(404).json({ message: 'No post found with this id!' });
		}

		res.status(200).json(postData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
