const router = require('express').Router();
const { Group } = require('../../models');
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
