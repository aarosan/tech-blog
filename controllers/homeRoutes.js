const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');


// This is what needs to be on the home routes

// get('/')
    // THIS WILL RENDER 'HOMEPAGE'

    // Any Posts Made
        // Just the title is shown in the post
    // + New Post at the bottom

    // The + New Post at the bottom goes to a handlebar page to create the post
            // THIS WILL RENDER 'NEWPOST'

    // If you click on the title of the article, it goes to a handlebar page to edit the post
            // THIS WILL RENDER 'EDITPOST'


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

// This is the homepage that will be shown once the user is logged in
router.get('/', withAuth, async (req, res) => {
    try {
        const userData = await User.findAll({
            attributes: { exclude: ['password']},
            order: [['name', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));


        res.render('homepage', { users });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }

    res.render('login');
  });
  

module.exports = router;