const router = require('express').Router();
const { Group, Post, Invitation } = require('../models');
const withAuth = require('../utils/auth');

// get route for public groups
router.get('/', async (req, res) => {
  try {
    const groupData = await Group.findAll({
      //insert here
    });

    // Serialize data so the template can read it
    const groups = groupData.map((group) => group.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      groups, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get route for when group is selected
router.get('/group/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [
        {
          model: Post
        },
      ],
    });

    const group = groupData.get({ plain: true });

    res.render('group', {
      ...group,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to access dashboard tab in nav
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Invitation
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render('dashboard', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to login/register page
router.get('/loginRegister', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('loginRegister');
});

module.exports = router;
