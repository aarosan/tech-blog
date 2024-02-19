const withAuth = (req, res, next) => {

    // Uncomment the line below to test http://localhost:3001/ in Postman
    req.session.loggedIn = true;

    if (!req.session.loggedIn) {
      res.redirect('/login-page');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;