const withAuth = (req, res, next) => {


    if (!req.session.loggedIn) {
      res.redirect('/login-page');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;