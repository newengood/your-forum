const router = require('express').Router();
const { Group, Post, User, Invitation } = require('../models');
const withAuth = require('../utils/auth');

// get route for public groups on homepage

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

// Route to access dashboard tab in nav

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Invitation
        },
        {
          model: Group
        },
        {
          model: Post
        }
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
