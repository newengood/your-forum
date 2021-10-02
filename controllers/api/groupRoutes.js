const router = require('express').Router();
const { Group, User, UserGroup, Topic, Post } = require('../../models');
const withAuth = require('../../utils/auth');

/* route to create group
  Request: { name } */
  router.post('/', withAuth, async (req, res) => {
	try {
		const user_id = req.session.user_id;

		const newGroup = await Group.create({
			...req.body,
			user_id: req.session.user_id,
		});

		if (!newGroup) {
			return res.status(500);
		}
		const group = newGroup.get({ plain: true });
		console.log(group.id);
		await UserGroup.create({
			group_id: group.id,
			user_id: req.session.user_id,
		});
		res.status(200).json(newGroup);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to delete group
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const groupData = await Group.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!groupData) {
			return res.status(404).json({ message: 'No group found with this id!' });
		}

		res.status(200).json(groupData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async (req, res) => {
	try {
		const newGroup = await Group.create(req.body);

		res.status(200).json(newGroup);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const groups = await Group.findAll({
			include: { all: true },
		});

		res.status(200).json(groups);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test/:id', async (req, res) => {
	try {
		const groupData = await Group.findByPk(req.params.id, {
			// include: {
			// 	all: true,
			// 	nested: true,
			// },
			include: [
				{
					model: Topic,
					include: Post,
				},
				{
					model: User,
					as: 'memberships',
					through: UserGroup,
					attributes: ['username'],
				},
			],
		});

		res.status(200).json(groupData);
	} catch (err) {
		console.log(err);
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const groupData = await Group.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!groupData) {
			return res.status(404).json({ message: 'No group found with this id!' });
		}

		res.status(200).json(groupData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
