/**
 * MateriaController
 *
 * @description :: Server-side logic for managing materias
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		findMateriaProyecto: function (req, res) {
			Materia.findAll({
				where: {adminProyecto: true},
				include: [{model: Area, as: 'area'}]
			})
			.then(data => {
				return res.json(data);
			})
			.catch(err => {
				return res.serverError(err)
			});
		}
};
