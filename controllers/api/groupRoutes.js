const router = require('express').Router();
const { Group, User, Topic, Post } = require('../../models');
const withAuth = require('../../utils/auth');


// route to create group

router.post('/', withAuth, async (req, res) => {
  try {
    const newGroup = await Group.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newGroup)
  } catch (err) {
    res.status(400).json(err);
  }
});

// get route for when group is selected to enter that group

router.get('/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [
        {
          model: User
        },
        {
          model: Topic
        },
        {
          model: Post
        }
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

// get route to display all groups a user is in. located in the dashboard groups partial

router.get('/:user_id', async (req, res) => {
  try {
    const groupData = await Group.findByFk(req.params.user_id, {
    //insert here
    });

    const groups = groupData.map((group) => group.get({ plain: true }));

    res.render('dasboard-groups', {
      ...groups,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
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
      res.status(404).json({ message: 'No group found with this id!' });
      return;
    }

    res.status(200).json(groupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
