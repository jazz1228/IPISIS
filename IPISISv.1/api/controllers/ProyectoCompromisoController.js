/**
 * ProyectoCompromisoController
 *
 * @description :: Server-side logic for managing Proyectoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getCompromisosByProject: function (req, res) {
        let proyecto_id = null;
        let semestre_id = null;

        proyecto_id = req.param('proyecto_id');
        if (!proyecto_id || proyecto_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código del proyecto' });
        }
        semestre_id = req.param('semestre_id');
        if (!semestre_id || semestre_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el semestre actual' });
        }

        return ProyectoCompromiso.findAll({
            where: { proyectoId: proyecto_id },
            include: [
                { model: CompromisoAdjProyecto, as: 'compromisoAdjProyecto' },
                {
                    model: MateriaCompromiso,
                    as: 'materiaCompromiso',
                    where: {
                        semestreCodigo: semestre_id
                    },
                    include: [
                        
                        { model: CompromisoAdjMateria, as: 'compromisoAdjMateria' },
                        {
                            model: Formato,
                            as: 'formatos',
                            include: [{
                                model: Seccion,
                                as: 'secciones'
                            }
                        ]
                        }
                    ]
                 } ]
                })
            .then(compromisos => {
                if (compromisos.length > 0) {
                    return res.ok(compromisos);
                } else {
                    return res.badRequest({ code: 1, msg: 'No se encontraron compromisos para el proyecto' });
                }
            })
            .catch(err => {
                return res.serverError(err);
            });

    }

}
