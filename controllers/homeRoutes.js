const router = require('express').Router();
const { User } = require('../models');
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


        res.render('homepage', { users });
        // This is the homepage that will be shown once the user is logged in


    } catch (err) {
        res.status(500).json(err);
    }
});


// post('/newPost')
    // LOCATED IN 'NEWPOST'

    // A form to take in the needed information
    // Title, Content textbox

    // Create button to trigger the post request


// put('/editPost') and delete('/editPost')
    // LOCATED IN 'EDITPOST'

    // Activated once the title is clicked from '/'
    // The title and content will populate from the DB
    // Access to change both the title and content
    
    // Update button to trigger put request
    // Delete button to trigger delete request


// homepage.handlebars
router.get('/homepage', (req, res) => {
    res.render('homepage');
});

// dashboard.handlebars
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// login.handlebars
router.get('/login-page', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }

    res.render('login');
});

router.get('/logout-page', (req, res) => {
    res.render('logout');
})

// signup.handlebars
router.get('/signup', (req, res) => {
    
    res.render('signup');
});
  
module.exports = router;