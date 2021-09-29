const router = require('express').Router();
const { UserGroup, Group, User } = require('../../models');
const withAuth = require('../../utils/auth');

/* route to create a UserGroup (membership)
  Request: { user_id, group_id } */
router.post('/', withAuth, async (req, res) => {
	try {
		const newUserGroup = await UserGroup.create(req.body);

		res.status(200).json(newUserGroup);
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to delete a UserGroup
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const userGroupData = await UserGroup.destroy({
			where: {
				id: req.params.id,
				user_id: req.session.user_id,
			},
		});

		if (!userGroupData) {
			return res
				.status(404)
				.json({ message: 'No user group found with this id!' });
		}

		res.status(200).json(userGroupData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async (req, res) => {
	try {
		const newUserGroup = await UserGroup.create(req.body);

		res.status(200).json(newUserGroup);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const userGroups = await UserGroup.findAll();

		res.status(200).json(userGroups);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const userGroupData = await UserGroup.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!userGroupData) {
			return res
				.status(404)
				.json({ message: 'No user group found with this id!' });
		}

		res.status(200).json(userGroupData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
