const withAuth = (req, res, next) => {
    

  // In the withAuth middleware, it checks if the logged_in property is not present in the req.session object. If it's not present (meaning the user is not authenticated), it redirects the user to the '/login' route. Otherwise, if the logged_in property is present, indicating that the user is authenticated, it calls the next() function to proceed to the next middleware in the stack.

  //session is from the server.js

    if (!req.session.logged_in) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;