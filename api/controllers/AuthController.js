/**
 * AuthController.js
 *
 * @description :: Server-side logic for managing authentication
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 *  Librerias utilizadas para la autenticación y autorización.
 */
var passport = require('passport');

module.exports = {
  signinUsuario: function(req, res) {
    passport.authenticate('ldap-usuario', _onPassportAuth.bind(this, req, res))(req, res);
  }
};

function _onPassportAuth(req, res, err, user, info) {
	var rol = null;
	var credencialesEstudiante = null;

	if (err) {
		return res.serverError({msg: 'Error', info: err});
	}

	else if (!user) {
		return res.serverError({msg: 'Info', info: info});
	}

	else {
		rol = user.rol;
    if(rol=='502'){
      rol='1005';
    }

		if (rol == '1005') {
 			  credencialesEstudiante = {
				identificacion: user.identificacion,
				nombreUsuario: user.nombreUsuario,
				nombre: user.nombre, 
        correo: user.nombreUsuario+'@udea.edu.co'
			}

			Estudiante.findOrCreate({where: {nombreUsuario: user.nombreUsuario}, defaults: credencialesEstudiante})
			.spread((estudiante, created) => {
        user.id = estudiante.id;
				return res.ok({token: CriptoService.crearToken(user), rol: rol});
			})
			.catch((err) => {
				res.serverError(err);
			});

		}
		else if (rol == '503') {
			credencialesProfesor = {
				nombreUsuario: user.nombreUsuario,
				nombre: user.nombre,
        tipo: 'planta',
        correo: user.nombreUsuario+'@udea.edu.co'
			}
			Profesor.findOrCreate({where: {nombreUsuario: user.nombreUsuario}, defaults: credencialesProfesor})
			.spread((profesor, created) => {
        user.id = profesor.id;
				return res.ok({token: CriptoService.crearToken(user), rol: rol});
			})
			.catch(function (err) {
				res.serverError(err);
			})
		}
		else if (rol == '505' || rol == '504') {
			return res.ok({token: CriptoService.crearToken(user), rol: rol});
		}
		else {
			return res.badRequest();
		}
	}
};
