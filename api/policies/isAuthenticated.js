/**
 * Politica para la autorización de un usuario valido del sitema.
 * Un usuario valido puede ser cualquier usuario de rol Equipo, Profesor. jefe o comité
 * que posea un token valido.
 */

var passport = require('passport');
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) {
      return res.serverError(err);
    } else if (!user) {
      return res.unauthorized(null, info && info.code, info && info.message);
    }
    req.user = user;
    next();
  })(req, res);
};
