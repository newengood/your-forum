const router = require('express').Router();
const { User, Invitation, Group, UserGroup, Post } = require('../../models');

/* route to register a new user
  Request: { username, email, password } */
router.post('/', async (req, res) => {
	try {
		const userData = await User.create(req.body);

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.status(200).json(userData);
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

/* route to login
  Request: { email, password } */
router.post('/login', async (req, res) => {
	try {
		const userData = await User.findOne({ where: { email: req.body.email } });

		if (!userData) {
			return res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			return res
				.status(400)
				.json({ message: 'Incorrect email or password, please try again' });
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: 'You are now logged in!' });
		});
	} catch (err) {
		res.status(400).json(err);
	}
});

// route to logout
router.post('/logout', (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});

// API TEST ROUTES
router.get('/test', async (req, res) => {
	try {
		const users = await User.findAll({
			include: [
				{
					model: Invitation,
					include: [
						{
							model: Group,
							attributes: ['name'],
						},
					],
				},
				{
					model: Post,
					attributes: ['title', 'content', 'createdAt'],
				},
				{
					model: Group,
					as: 'memberships',
					through: UserGroup,
					attributes: ['id', 'name'],
				},
			],
		});

		res.status(200).json(users);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
