// checks to make sure the user is in a session by checking if req.user is true.
// Returns an object where isAuthenticated is false if no one is logged on.
module.exports = function(req, res, next) {
  if (req.user) {
    return next();
  }
  return res.json({ isAuthenticated: false });
};