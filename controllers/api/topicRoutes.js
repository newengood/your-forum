const router = require('express').Router();
const { Topic } = require('../../models');
const withAuth = require('../../utils/auth');


// route to create a topic

router.post('/', withAuth, async (req, res) => {
  try {
    const newTopic = await Topic.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTopic)
  } catch (err) {
    res.status(400).json(err);
  }
});

// get route to display all topics to group topics partial

router.get('/', async (req, res) => {
  try {
    const topicData = await Topic.findAll(
        // insert here
    );

    const topics = topicData.map((topic) => topic.get({ plain: true }));

    res.render('group-topics', {
      ...topics,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


// route to delete a topic
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const topicData = await Topic.destroy({
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
