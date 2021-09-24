// helper function to determine user authorization

const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    res.redirect('/loginRegister');
  } else {
    next();
  }
};

module.exports = withAuth;
