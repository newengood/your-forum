const router = require('express').Router();
const { Invitation } = require('../../models');
const withAuth = require('../../utils/auth');

// route to display all invitaions on dashboard-invitations partial

router.get('/', async (req, res) => {
  try {
    const invitationData = await Invitation.findAll({
      //insert here
    });

    // Serialize data so the template can read it
    const invitations = invitationData.map((invitation) => invitation.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('dashboard-invitations', { 
      invitations, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// route to create invitation to group

router.post('/:email', withAuth, async (req, res) => {
  try {
    const newInvitation = await Invitation.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newInvitation)
  } catch (err) {
    res.status(400).json(err);
  }
});

// route to cancel invitation to group?

router.delete('/:email', withAuth, async (req, res) => {

});

// Route to accept invitation?

router.post('/:id', async(req, res) => {
// insert here

});

// Route to decline invitaiton

router.delete('/:id', async(req, res) => {
  // insert here
  
  });
  

module.exports = router;
