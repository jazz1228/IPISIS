/**
* SemestreController
*
* @description :: Server-side logic for managing semestres
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
	crear: function (req, res) {
		var codigo = null;
		var semestreInicio = null;
		var semestreCierre = null;
		var inscripcionInicio = null;
		var inscripcionCierre = null;
		var offset = null;

		codigo = req.param('codigo');
		if (!codigo) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el código del semestre'});
		}
		semestreInicio = req.param('semestreInicio');
		if (!semestreInicio) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de inicio del semestre'});
		}
		semestreCierre = req.param('semestreCierre');
		if (!semestreCierre) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de cierre del semestre'});
		}
		inscripcionInicio = req.param('inscripcionInicio');
		if (!inscripcionInicio) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de inicio de las inscripciones'});
		}
		inscripcionCierre = req.param('inscripcionCierre');
		if (!inscripcionCierre) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de cierre de las inscripciones'});
		}
		offset = req.param('offset');
		if (!offset) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el offset de su zona horaria.'});
		}

		if (semestreInicio >= semestreCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de cierre de semestre no puede ser mayor a la fecha de inicio.'})
		}
		semestreInicio = new Date(semestreInicio);
		semestreCierre = new Date(semestreCierre);


		if (inscripcionInicio >= inscripcionCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de cierre de inscripción no puede ser mayor a la fecha de inicio.'})
		}
		inscripcionInicio = new Date(inscripcionInicio);
		inscripcionCierre = new Date(inscripcionCierre);

		if (inscripcionInicio >= semestreCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de inscripcion no puede ser despues de la fecha de cierre del semestre.'})
		}

		Semestre.findAll({
			where: {
				$or: [
					{
						semestreInicio: {$lte: semestreInicio},
						semestreCierre: {$gte: semestreInicio}
					},
					{
						semestreInicio: {
							$gte: semestreInicio,
							$lte: semestreCierre
						}
					},
					{
						inscripcionInicio: {$lte: inscripcionInicio},
						inscripcionCierre: {$gte: inscripcionInicio}
					},
					{
						inscripcionInicio: {
							$gte: inscripcionInicio,
							$lte: inscripcionCierre
						},
					}
				]
			}
		})
		.then(resSemestre => {
			if (resSemestre.length <= 0) {
				return Semestre.findOne({where: {codigo: codigo}});
			} else {
				throw {code: 3, msg: 'La fecha establecida para el semestre o la inscripcion ya existe'};
			}
		})
		.then(resSemestre => {
			if (!resSemestre) {
				return Semestre.create({
					codigo: codigo,
					semestreInicio: semestreInicio,
					semestreCierre: semestreCierre,
					inscripcionInicio: inscripcionInicio,
					inscripcionCierre: inscripcionCierre
				});
			} else {
				throw {code: 4, msg: 'El semestre ya existe'};
			}
		})
		.then(resSemestre => {
			return res.created();
		})
		.catch(err => {
			if (err.code) {
				return res.badRequest(err);
			}
			return res.serverError(err);
		});
	},

	actualizar: function (req, res) {
		var codigo = null;
		var semestreInicio = null;
		var semestreCierre = null;
		var inscripcionInicio = null;
		var inscripcionCierre = null;
		var offset = null;

		codigo = req.param('codigo');
		if (!codigo) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el código del semestre'});
		}
		semestreInicio = req.param('semestreInicio');
		if (!semestreInicio) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de inicio del semestre'});
		}
		semestreCierre = req.param('semestreCierre');
		if (!semestreCierre) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de cierre del semestre'});
		}
		inscripcionInicio = req.param('inscripcionInicio');
		if (!inscripcionInicio) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de inicio de las inscripciones'});
		}
		inscripcionCierre = req.param('inscripcionCierre');
		if (!inscripcionCierre) {
			return res.badRequest({code: 1, msg: 'Debe ingresar la fecha de cierre de las inscripciones'});
		}
		offset = req.param('offset');
		if (!offset) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el offset de su zona horaria.'});
		}

		if (semestreInicio >= semestreCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de cierre de semestre no puede ser mayor a la fecha de inicio.'})
		}

		if (inscripcionInicio >= inscripcionCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de cierre de inscripción no puede ser mayor a la fecha de inicio.'})
		}

		if (inscripcionInicio >= semestreCierre) {
			return res.badRequest({code: 2, msg: 'La fecha de inscripcion no puede ser despues de la fecha de cierre del semestre.'})
		}
		Semestre.findAll({
			where: {
				codigo: {$not: codigo},
				$or: [
					{
						semestreInicio: {$lte: semestreInicio},
						semestreCierre: {$gte: semestreInicio}
					},
					{
						semestreInicio: {
							$gte: semestreInicio,
							$lte: semestreCierre
						}
					},
					{
						inscripcionInicio: {$lte: inscripcionInicio},
						inscripcionCierre: {$gte: inscripcionInicio}
					},
					{
						inscripcionInicio: {
							$gte: inscripcionInicio,
							$lte: inscripcionCierre
						},
					}
				]
			}
		})
		.then(resSemestre => {
			if (resSemestre.length <= 0) {
				return Semestre.update({
					semestreInicio: semestreInicio,
					semestreCierre: semestreCierre,
					inscripcionInicio: inscripcionInicio,
					inscripcionCierre: inscripcionCierre
				},
				{
					where: {codigo, codigo}
				}
			);
			} else {
				throw {code: 3, msg: 'La fecha establecida para el semestre o la inscripcion ya existe'};
			}
		})
		.then(resSemestre => {
			return res.ok();
		})
		.catch(err => {
			if (err.code) {
				return res.badRequest(err);
			}
			return res.serverError(err);
		});
	},

	eliminar: function (req, res) {
		var codigo = null;

		codigo = req.param('codigo');
		if (!codigo) {
			return res.badRequest({code: 1, msg: 'Debe ingresar el código del semestre'});
		}

		Semestre.findOne({where:{codigo: codigo}, include:[{all: true}]})
		.then(resSemestre => {
			if (!resSemestre) {
				throw {code: 3, msg: 'El semestre no existe'};
			}

			if (resSemestre.ofertas.length > 0) {
				throw {code: 2, msg: 'El semestre no puede ser eliminado.'};
			}

			if (resSemestre.materiaCompromisos.length > 0) {
				throw {code: 2, msg: 'El semestre no puede ser eliminado.'};
			}

			if (resSemestre.preinscripciones.length > 0) {
				throw {code: 2, msg: 'El semestre no puede ser eliminado.'};
			}
			return Semestre.destroy({where: {codigo: codigo}});
		})
		.then(resSemestre => {
			return res.ok();
		})
		.catch(err => {
			if (err.code) {
				return res.badRequest(err);
			}
			return res.serverError(err);
		});
	},

	getSemestreActual: function (req, res) {
		var fechaActual = new Date();
		Semestre.findOne({
			where: {
				semestreInicio: {$lte: fechaActual},
				semestreCierre: {$gte: fechaActual}
			}
		})
		.then(resSemestre => {
			return res.ok(resSemestre);
		})
		.catch(err => {
			return res.serverError(err);
		});
	},

	getAll: function(req, res) {
		Semestre.findAll()
		.then(semestres => {
			return res.ok(semestres);
		})
		.catch(err => {
			return res.serverError(err)
		})
	},

	test: function (req, res) {
		var timestamp = req.param('timestamp');
		var offset = req.param('offset');

		timestamp = parseInt(timestamp);
		offset = parseInt(offset);
		// var date = TimezoneService.getDate({timestamp: timestamp, offset: offset});
		var date = new Date(timestamp);
		sails.log.debug(timestamp);
		sails.log.debug(offset);
		sails.log.debug(date);

		return Semestre.create({
			codigo: 1,
			semestreInicio: date,
			semestreCierre: date,
			inscripcionInicio: date,
			inscripcionCierre: date
		})
		.then(resSemestre => {
			return res.ok([resSemestre, timestamp, offset, date, typeof date, typeof resSemestre.semestreInicio]);
		})
		.catch(err => {
			return res.serverError(err);
		});

	}
};
