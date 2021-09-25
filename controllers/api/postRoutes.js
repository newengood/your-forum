const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


// route to create a post

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost)
  } catch (err) {
    res.status(400).json(err);
  }
});

// get route to display all posts from a group to group topics partial

router.get('/:group_id', async (req, res) => {
  try {
    const postData = await Post.findAll(
        // insert here
    );

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('group-posts', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get route to display all posts by specific user in dashboard posts partial

router.get('/:user_id', async (req, res) => {
  try {
    const postData = await Post.findByFk(req.params.user_id, {
    //insert here
    });

    const posts = postData.get({ plain: true });

    res.render('dasboard-posts', {
      ...posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



// route to delete a post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
