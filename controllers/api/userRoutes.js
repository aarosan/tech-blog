const router = require('express').Router();
const { User } = require('../../models');

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
  
      //This method is used to save the session data to the session store. It ensures that any changes made to the session variables are persisted before continuing with the rest of the code inside the callback function.
      req.session.save(() => {

        //This line sets the user_id property in the session to the id value retrieved from the userData object. This is typically done after a user successfully logs in, where userData contains information about the logged-in user, such as their database ID.
        req.session.user_id = userData.id;

        //This line sets the logged_in property in the session to true, indicating that the user is now logged in. This flag is commonly used throughout the application to check if the user is authenticated and to grant access to protected routes or resources.
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
router.post('/logout', (req, res) => {
if (req.session.logged_in) {
    req.session.destroy(() => {
    res.status(204).end();
    });
} else {
    res.status(404).end();
}
});
  
module.exports = router;