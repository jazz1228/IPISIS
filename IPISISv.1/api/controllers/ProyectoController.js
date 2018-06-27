/**
 * ProyectoController
 *
 * @description :: Server-side logic for managing Proyectoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    getByTutor: function (req, res) {
        let tutor_id= null;
        let semestre_codigo= null;

        tutor_id = req.user.id;

          semestre_codigo = req.param('semestre_codigo');
        if (!semestre_codigo) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el codigo del semestre'});
        }

        return Proyecto.findAll({
            include: [
                {
                    model: Inscripcion,
                    as: 'inscripcion',
                    include: [
                        {
                            model: Oferta,
                            as: 'oferta',
                            where: {
                                 profesorId: tutor_id,
                                 semestreCodigo: semestre_codigo
                             }
                        }
                      ]
                }

            ]})
          .then(proyectos => {
            return res.ok(proyectos);
          })
          .catch(err => {
            return res.serverError(err);
          });
    },

    getEquipo: function (req,res) {
        let proyecto_id = null;

        proyecto_id = req.param('proyecto_id');
        if (!proyecto_id) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el codigo del proyecto'});
        }
        return Proyecto.findAll({
            include: [
                {
                    model: Inscripcion,
                    as: 'inscripcion',
                    include: [
                        {
                            model: Equipo,
                            as: 'equipo',
                            include: [
                                {
                                    model: Estudiante,
                                    as: 'estudiantes'
                                }
                              ]
                        }
                      ]
                }
            ],
            where: {
                id: proyecto_id,
            }
        })
          .then(proyectos => {
            return res.ok(proyectos);
          })
          .catch(err => {
            return res.serverError(err);
          });
    },
  getProjectByEquipo: function (req,res) {
        let equipo_id = null;

        equipo_id = req.param('equipo_id');
        if (!equipo_id) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el codigo del equipo'});
        }
        
        Proyecto.findAll({
            include: [
                {
                    model: Inscripcion,
                    as: 'inscripcion',
                    where:{
                        equipoCodigo:  equipo_id
                    }
                }
            ]
        }).then(proyecto =>{
            if (proyecto.length<=0) {
                return res.badRequest({msg: 'el equipo no tiene un proyecto asignado'}); 
            }
            return res.ok(proyecto);
        })
        .catch(err => {
          return res.serverError(err);
        });
    }
};
