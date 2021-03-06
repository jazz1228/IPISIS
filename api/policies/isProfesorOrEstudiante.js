/**
 * Politica para la autorización de usuario con rol equipo o profesor.
 */

var passport = require('passport');
module.exports = function (req, res, next) {
  passport.authenticate('jwt', function (err, user, info) { 
    if (err) {
      return res.serverError();
    }
    else if (!user) {
      return res.unauthorized(null, info && info.code, info && info.message);
    }
    if (user.rol === '1005' || user.rol=='502') {
        req.user = user;
        next();
    } else if(user.rol === '503'){
        req.user = user;
        next();
    } else {
      return res.unauthorized();
    }
  })(req, res);
};