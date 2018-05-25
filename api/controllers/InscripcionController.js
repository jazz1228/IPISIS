/**
* InscripcionController
*
* @description :: Server-side logic for managing inscripcions
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
module.exports = {

  getAllBySemestre: function(req, res) {
    // Parametros de entrada.
    var semestreCodigo = null;

    semestreCodigo = req.param('semestreCodigo');
    if (!semestreCodigo) {
      return res.badRequest({code: 1, msg: 'Debe ingresar el codigo del semestre.'});
    }

    Inscripcion.findAll({
      include: [
        {model: Materia, as: 'materia'},
        {
          model: Equipo,
          as: 'equipo',
          include: [
            {model: Estudiante, as: 'estudiantes', through: {attributes: []}}
          ]
        },
        {
          model: Oferta,
          as: 'oferta',
          include: [
            {model: Semestre, as: 'semestre', where: {codigo: semestreCodigo}},
            {model: Idea, as: 'idea'},
            {model: Profesor, as: 'profesor'}
          ]
        },
        {
          model: HistorialInscripcion,
          as: 'historialInscripcion',
          where: {
            estado: 'CREADA',
            fechaActualizacion: {
              $in: [
                sequelize.literal(
                  'SELECT MAX(`fecha_actualizacion`) \
                  FROM `historial_inscripcion` \
                  WHERE `Inscripcion`.`id` = `historial_inscripcion`.`inscripcion_id`'
                )
              ]
            }
          }
        }
      ]
    })
    .then(resInscripciones => {
      return res.ok(resInscripciones);
    })
    .catch(err => {
      return res.serverError(err);
    });
  },

  gestionarInscripcion: function (req, res) {
    var accion = null;
    var inscripcionId = null;
    var observacion = null;
    var estado = null;
    var historial = null;
    var grupo_Mares = null;

    accion = req.param('accion');
    if (!accion) {
      return res.badRequest({code: 1, msg:'Debe ingresar una acción y más.'});
    }

    inscripcionId = req.param('inscripcionId');
    if (!inscripcionId) {
      return res.badRequest({code: 1, msg:'Debe ingresar el id de la inscripción.'});
    }

    observacion = req.param('observacion');
    if (!observacion) {
      return res.badRequest({code: 1, msg:'Debe ingresar una observación.'});
    }


    if (accion == 1) {
      estado = 'ACEPTADA';
      grupo_Mares = req.param('grupoMares');
      if (!grupo_Mares) {
        return res.badRequest({code: 1, msg:'Debe ingresar un grupo.'});
      }
    }
    else if (accion == 2) {
      estado = 'RECHAZADA';
    } else {
      return res.badRequest({code: 2, msg: 'La acción ingresada no es valida.'})
    }

    sequelize.transaction(t => {
      return Inscripcion.findOne({
        where: {id: inscripcionId},
        include: [
          {
            model: Oferta,
            as: 'oferta',
            include: [
              {model: Idea, as: 'idea'}
            ]
          }
        ]
      }).then(resInscripcion => {
        if (!resInscripcion) {
          throw {code: 3, msg: 'La inscripción no existe.'}
        }

        return Inscripcion.findAll({
          where: {equipoCodigo: resInscripcion.equipoCodigo},
          include: [
            {
              model: HistorialInscripcion, as: 'historialInscripcion',
              where: {
                estado: 'CREADA',
                fechaActualizacion: {
                  $in: [sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_inscripcion` \
                  WHERE `Inscripcion`.`id` = `historial_inscripcion`.`inscripcion_id`')]
                }
              }
            }
          ]
        })
        .then(resInscripciones => {
          var historialInscripciones = [];
          resInscripciones.forEach(function (inscripcion, index, array) {
            if (inscripcion.id != inscripcionId) {
              historial = {
                inscripcionId: inscripcion.id,
                fechaActualizacion: new Date(Date.now() + (-300 * 60 * 1000)),
                observacion: 'La inscripción se ha anulado automaticamente ya que el equipo quedó inscrito en otra oferta.',
                estado: 'RECHAZADA'
              };
              historialInscripciones.push(historial);
            }
          });
          return HistorialInscripcion.bulkCreate(historialInscripciones, {transaction: t})
          .then(resHistorialInscripcion => {
            historial = {
              inscripcionId: inscripcionId,
              fechaActualizacion: new Date(Date.now() + (-300 * 60 * 1000)),
              observacion: observacion,
              estado: estado
            };
            return  HistorialInscripcion.create(historial, {transaction: t})
            .then( resHistorialInscripcion => {
              var proyecto = {
                inscripcionId: resInscripcion.id,
                grupoMares: grupo_Mares,
                nombre: resInscripcion.oferta.idea.titulo
              }
              return Proyecto.create(proyecto, {transaction: t});
            });
          });
        });
      })
      .catch(err => {
        throw err;
      });

    })
    .then(result => {
      return res.ok();
    })
    .catch(err => {
      return res.serverError(err);
    });


  },

  getInscripcionesEquipo: function (req, res) {
    var equipoCodigo = null;

    var equipoCodigo = req.param('equipoCodigo');
    if (!equipoCodigo) {
      return res.badRequest({code: 1, msg: 'Parametro equipoCodigo invalido'});
    }

    Inscripcion.findAll({
      include: [
        {model: Materia, as: 'materia'},
        {model: Equipo, as: 'equipo', where: {codigo: equipoCodigo}},
        {
          model: Oferta,
          as: 'oferta',
          include: [
            {model: Semestre, as: 'semestre'},
            {model: Idea, as: 'idea'},
            {model: Profesor, as: 'profesor'}
          ]
        },
        {
          model: HistorialInscripcion,
          as: 'historialInscripcion',
          where: {
            fechaActualizacion: {
              $in: [
                sequelize.literal(
                  'SELECT MAX(`fecha_actualizacion`) \
                  FROM `historial_inscripcion` \
                  WHERE `Inscripcion`.`id` = `historial_inscripcion`.`inscripcion_id`'
                )
              ]
            }
          }
        }
      ]
    })
    .then(resHistorial => {
      return res.ok(resHistorial);
    })
    .catch(err => {
      return res.serverError(err);
    });
  }
};
