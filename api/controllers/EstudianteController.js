/**
 * EstudianteController
 * @description :: Server-side logic for managing estudiantes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 **/
module.exports = {
	//Obtiene todos los estudiantes de la base de datos
	getAll: function(req, res) {
		Estudiante.findAll()
		.then(resEstudiantes => {
			return res.json(resEstudiantes);
		})
		.catch(err => {
			return res.serverError(err);
		});
	},

	getByUsuario: function (req, res) {
		var usuario = null;

		usuario = req.param("usuario");
		if (!usuario) {
			return res.badRequest({code: 1, msg: 'Debe ingresar un nombre de usuario.'});
		}

		Estudiante.find({where: {nombreUsuario: usuario}})
		.then(resEstudiante => {
			if (resEstudiante) {
				return res.ok(resEstudiante);
			}
			else {
				return res.badRequest({code: 2, msg: 'El usuario no existe.'});
			}
		})
		.catch(err => {
			return res.serverError(err);
		});
	},

	getBySession: function (req, res) {
		var estudianteId = null;

		estudianteId = req.user.id;
		if (!estudianteId) {
			return res.forbidden();
		}

		Estudiante.find({where: {id: estudianteId}})
		.then(resEstudiante => {
			if (resEstudiante) {
				return res.ok(resEstudiante);
			}
			else {
				return res.badRequest({code: 2, msg: 'El usuario no existe.'});
			}
		})
		.catch(err => {
			return res.serverError(err);
		});
	},

	//Obtiene todo los estudiantes de un equipo determinado
	getByEquipo: function(req, res) {
		var equipoCodigo = null;

		equipoCodigo = req.param("equipoCodigo");
		if (!equipoCodigo) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el código del equipo.'});
		}

		Equipo.find({
			where: {codigo: equipo},
			include: [{model: Estudiante, as: 'estudiantes'}]
		})
		.then(resEstudiantes => {
		  return res.ok(resEstudiantes);
		})
		.catch(err => {
			return res.serverError(err);
		});
	}
};
