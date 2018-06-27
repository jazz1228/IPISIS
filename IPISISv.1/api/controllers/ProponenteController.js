/**
 * ProponenteController
 *
 * @description :: Server-side logic for managing proponentes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getAll: function (req, res) {
		Proponente.findAll({include: [{all:true}]})
		.then(proponentes => {
			return res.ok(proponentes);
		})
		.catch(err => {
			return res.serverError(err)
		})
	}
};
