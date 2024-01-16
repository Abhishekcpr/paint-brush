exports.isLoggedIn = function (req, res, next) {
  if(req.user) {
    next();
  } else {
    return res.status(401).send('<center><h1> You cannot enter without logging in...</h1></center>');
  }
}