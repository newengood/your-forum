const router = require('express').Router();
const { Topic, Group } = require('../../models');
const withAuth = require('../../utils/auth');

/* route to create a new topic
  Request: { name, group_id } */
router.post('/', withAuth, async (req, res) => {
	try {
		const newTopic = await Topic.create(req.body);

		res.status(200).json(newTopic);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to delete topic
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const topicData = await Topic.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!topicData) {
			return res.status(404).json({ message: 'No topic found with this id!' });
		}

		res.status(200).json(topicData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async (req, res) => {
	try {
		const newTopic = await Topic.create(req.body);

		res.status(200).json(newTopic);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const topics = await Topic.findAll({
			include: { all: true },
		});

		res.status(200).json(topics);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const topicData = await Topic.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!topicData) {
			return res.status(404).json({ message: 'No topic found with this id!' });
		}

		res.status(200).json(topicData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
