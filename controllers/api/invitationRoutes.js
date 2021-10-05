const router = require('express').Router();
const { User, Invitation, Group } = require('../../models');
const withAuth = require('../../utils/auth');
const sendGrid = require('../../utils/sendGridApi');

/* route to invite a user to join a group
  Request: { email, group_id } */
router.post('/', withAuth, async ({ body }, res) => {
	try {
		const userData = await User.findOne({ where: { email: body.email } });

		if (!userData) {
			res
				.status(400)
				.json({ message: 'Unable to locate user or group, please try again' });
			return;
		}

		const groupData = await Group.findByPk(body.group_id, {
			attributes: ['name'],
		});
		const group = groupData.get({ plain: true });

		const newInvite = Invitation.create({
			user_id: userData.id,
			group_id: body.group_id,
		});

		sendGrid.sendEmailNotification(
			body.email,
			`[Your Forum] You've received an invitation!`,
			`You've been invited to join the '${group.name}' group. Click the following link to accept the invitation.

			{www.google.com}`,
			`You've been invited to join the '${group.name}' group. Click the following link to accept the invitation.

			<a href='https://pacific-journey-91002.herokuapp.com/'>Your Forum Dashboard</a>`
		);

		res.status(200).json(newInvite);
	} catch (err) {
		res.status(400).json(err);
	}
});

/* route to delete an invitation */
router.delete('/:id', withAuth, async (req, res) => {
	try {
		const inviteData = await Invitation.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!inviteData) {
			res.status(404).json({ message: 'No invitation found with this id!' });
			return;
		}

		res.status(200).json(inviteData);
	} catch (err) {
		res.status(500).json(err);
	}
});

// API TEST ROUTES (no Auth middleware or session dependencies...)
router.post('/test', async ({ body }, res) => {
	try {
		const userData = await User.findOne({ where: { email: body.email } });

		if (!userData) {
			res
				.status(400)
				.json({ message: 'Unable to locate user or group, please try again' });
			return;
		}

		const newInvite = Invitation.create({
			user_id: userData.id,
			group_id: body.group_id,
		});

		res.status(200).json(newInvite);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/test', async (req, res) => {
	try {
		const invitations = await Invitation.findAll({
			include: { all: true },
		});

		res.status(200).json(invitations);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/test/:id', async (req, res) => {
	try {
		const inviteData = await Invitation.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!inviteData) {
			return res
				.status(404)
				.json({ message: 'No invitation found with this id!' });
		}

		res.status(200).json(inviteData);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
