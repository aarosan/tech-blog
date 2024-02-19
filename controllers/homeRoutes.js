const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');


// This is what needs to be on the home routes

// homepage.handlebars
router.get('/', withAuth, async (req, res) => {
    try {

        const userData = await User.findAll({
            attributes: { exclude: ['password']},
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        const message = "Welcome to the homepage!"
        
        // Uncomment .json/Comment .render for Postman API test
        res.status(200).render('homepage', { users });
        // res.status(200).json({ message: message });


    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/allPosts', async (req, res) => {
    try {
        const postData = await Post.findAll();

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/newPost', async (req, res) => {
    // LOCATED IN 'NEWPOST'. A BUTTON IN 'NEWPOST' TRIGGERS THIS CALL

    // Create button to trigger the post request

    try {
        const { title, content } = req.body;

        const date = new Date();

        const newPost = await Post.create({
            title,
            content,
            date
        });

        const message = "New post added!"

        // Uncomment .json/Comment .render for Postman API test
        // NEED TO ATTACH THE RENDER SOMEWHERE ONCE BUTTONS ARE ACTIVE
        // res.status(200).render('homepage', { users });
        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/editPost/:postId', async (req, res) => {

    // LOCATED IN 'EDITPOST'

    // Activated once the title is clicked from '/'
    // The title and content will populate from the DB
    // Access to change both the title and content
    
    // Update button to trigger put request

    try {
        const postId = req.params.postId;
        const { title, content } = req.body;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        if (title) {
            post.title = title;
        }

        if (content) {
            post.content = content;
        }
        
        await post.save();

        const message = `Post ${postId} Edited!`

        // Uncomment .json/Comment .render for Postman API test
        // NEED TO ATTACH THE RENDER SOMEWHERE ONCE BUTTONS ARE ACTIVE
        // res.status(200).render('homepage', { users });
        res.status(200).json({ message: message });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update post!' });
    }
});

router.delete('/editPost/:postId', async (req, res) => {
    // LOCATED IN 'EDITPOST'

    // Activated once the title is clicked from '/'
    // The title and content will populate from the DB
    // Access to change both the title and content
    
    // Delete button to trigger delete request
    try {
        const postId = req.params.postId;

        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        await post.destroy();


        const message = `Post ${postId} Deleted!`

        // Uncomment .json/Comment .render for Postman API test
        // NEED TO ATTACH THE RENDER SOMEWHERE ONCE BUTTONS ARE ACTIVE
        // res.status(200).render('homepage', { users });
        res.status(200).json({ message: message });

    } catch (err) {
        res.status(500).json({ error: 'Failed to update post' });
    }
});
   

// homepage.handlebars
router.get('/homepage', (req, res) => {
    const message = "Welcome to the homepage!"

     // Uncomment .json/Comment .render for Postman API test
    res.status(200).render('homepage');
    // res.status(200).json({ message: message });
});

// dashboard.handlebars
router.get('/dashboard', (req, res) => {
    const message = "Welcome to the dashboard!"

    
    // Uncomment .json/Comment .render for Postman API test
    res.status(200).render('dashboard');
    // res.status(200).json({ message: message });
});

// login.handlebars
router.get('/login-page', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    const message = "Welcome to the login page!"

    // Uncomment .json/Comment .render for Postman API test
    res.status(200).render('login');
    // res.status(200).json({ message: message });
});



// signup.handlebars
router.get('/signup', (req, res) => {
    const message = "Welcome to the signup page!"

    // Uncomment .json/Comment .render for Postman API test
    res.status(200).render('signup');
    // res.status(200).json({ message: message });
});
  
module.exports = router;