/**
 * AreaController
 *
 * @description :: Server-side logic for managing areas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	find: function(req,res){
		Area.findAll({include: [{model: Materia, as: 'materias'}]})
		.then(data => {
			return res.json(data);
		})
		.catch(err => {
			return res.serverError(err);
		})
	}
};
