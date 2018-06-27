/**
 * Politica para la autorización de usuario con rol comité.
 */

var passport = require('passport');
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return res.serverError();
    } else if (!user) {
      return res.unauthorized(null, info && info.code, info && info.message);
    }
    if (user.rol === '504') {
      req.user = user;
      next();
    } else {
      return res.unauthorized();
    }
  })(req, res);
};
