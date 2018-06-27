/**
 * ProfesorController
 *
 * @description :: Server-side logic for managing Profesors
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getPerfil: function(req, res) {
		var profesor = req.user;
		Profesor.findOne(profesor)
		.then(function(user) {
			res.ok(user);
		})
		.catch(res.serverError);
	},

	getAll: function(req, res) {
		Profesor.findAll()
		.then(profesores => {
			return res.ok(profesores);
		})
		.catch(err => {
			return res.serverError(err);
		});
	},

	get: function(req, res) {
		var id = req.param('id');
		if (!id) {
			return res.badRequest({code:1, msg:'Debe ingresar el id del profesor.'});
		}

		Profesor.find({where: {id: id}})
		.then(profesor => {
			return res.ok(profesor);
		})
		.catch(err => {
			return res.serverError(err);
		});
	}
};
