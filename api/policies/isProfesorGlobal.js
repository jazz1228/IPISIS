/**
 * Politica para la autorización de usuario con rol comité, jefe o profesor.
 */

var passport = require('passport');
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    var rol = null;

    if (err) {
      return res.serverError();
    } else if (!user) {
      return res.unauthorized();
    }

    rol = user.rol;
    if (rol === '503' || rol === '504' || rol === '505') {
      req.user = user;
      next();
    } else {
      return res.unauthorized();
    }
  })(req, res);
};
