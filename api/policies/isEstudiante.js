/**
 * Politica para la autorización de usuario con rol equipo.
 */

var passport = require('passport');
module.exports = function (req, res, next) {
<<<<<<< HEAD
  passport.authenticate('jwt', function (err, user, info) { 
=======
  passport.authenticate('jwt', function (err, user, info) {
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    if (err) {
      return res.serverError();
    }
    else if (!user) {
      return res.unauthorized();
    }
    if (user.rol === '1005' || user.rol=='502') {
      req.user = user;
      next();
    } else {
      return res.unauthorized();
    }
  })(req, res);
};
