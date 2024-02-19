const router = require('express').Router();
const { User } = require('../../models');

// All routes tested and working


router.post('/signup', async (req, res) => {
  try {

    const userData = req.body;

    const newUser = await User.create(userData);

    res.json({ user: newUser, message: 'You are now signed up!' });

  } catch (error) {
    res.status(400).json(error);
  }
});


router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      //checks email first against the database
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      //checks password next against the database
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {

        req.session.user_id = userData.id;

        req.session.loggedIn = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.get('/logout', (req, res) => {
if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
} else {
    res.status(404).end();
}
});
  
module.exports = router;