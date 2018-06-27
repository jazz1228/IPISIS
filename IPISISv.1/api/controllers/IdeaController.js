/**
* IdeaController
*
* @description :: Server-side logic for managing ideas
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/

module.exports = {
  crearIdea: function(req, res) {
    // Definición de variables a utilizar
    var titulo = null;
    var descripcion = null;
    var numMiembros = null;
    var numEquipos = null;

    var idea = null;
    var prerrequisitos = null;
    var asignaturas = null;
    var propotentes = null;
    var historial = null;

    titulo = req.param('titulo');
    if (!titulo) {
      return res.badRequest({code:1, msg: 'Se debe ingresar un titulo'});
    }

    descripcion = req.param('descripcion');
    if (!descripcion) {
      return res.badRequest({code:1, msg: 'Se debe ingresar una descripcion'});
    }

    numMiembros = req.param('numMiembros');
    if (!numMiembros) {
      return res.badRequest({code:1, msg: 'Se debe ingresar un número de miembros'});
    }

    numEquipos = req.param('numEquipos');
    if (!numEquipos) {
      return res.badRequest({code:1, msg: 'Se debe ingresar un número de equipos'});
    }

    prerrequisitos = req.param('prerrequisitos');
    if (!prerrequisitos || prerrequisitos.length === 0) {
      return res.badRequest({error: 1, mensaje: "Seleccione algún prerrequisito"});
    }

    if (typeof prerrequisitos == 'string') {
      prerrequisitos = [prerrequisitos]
    }

    var asignaturas = req.param('asignaturas');
    if (!asignaturas || asignaturas.length === 0) {
      return res.send("Ingrese alguna asignatura");
    }

    if (typeof asignaturas == 'string') {
      asignaturas = [asignaturas];
    }

    var proponentes = req.param('proponentes');
    if (!proponentes || proponentes.length === 0) {
      return res.send("Ingrese algún propotente");
    }

    idea = {
      titulo: titulo,
      descripcion: descripcion,
      numMiembros: numMiembros,
      numEquipos: numEquipos,
    };

    historial = {
      observacion: 'Idea creada',
      estado: 'PROPUESTA',
      fechaActualizacion: new Date()
    };

    sequelize.transaction(t => {
      return Idea.create(idea, {transaction: t}).then(idea => {
        return Materia.findAll({where: {codigo: {$in: prerrequisitos}}}).then(prerreq => {
          return idea.addPrerrequisitos(prerreq, {transaction: t}).then(resultPrerreq => {
            return Materia.findAll({where: {codigo: {$in: asignaturas}}}).then(asign => {
              return idea.addAsignaturas(asign, {transaction: t}).then(resultAsign => {

                proponentes.forEach(function (proponente, i, array) {
                  proponente.ideaId = idea.get('id');
                });
                return Proponente.bulkCreate(proponentes, {transaction: t}).then(() => {
                  return HistorialIdea.create(historial, {transaction: t}).then(resultHist => {
                    return idea.addHistorialIdea(resultHist, {transaction: t});
                  });
                });
              });
            });
          });
        });
      })
    })
    .then(result => {
      return res.created();
    })
    .catch(err => {
      return res.serverError(err)
    });
  },

  ideasPropuestas: function(req, res) {
    return Idea.findAll({
      include: [
        {model: Materia, as: 'asignaturas' },
        {model: Materia, as: 'prerrequisitos'},
        {model: Proponente, as: 'proponentes'},
        {
          model: HistorialIdea,
          as: 'historialIdea',
          where: {
            estado: 'PROPUESTA',
            fechaActualizacion: {
              $in: [
                sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_idea` WHERE `Idea`.`id` = `historial_idea`.`idea_id`')
              ]
            }
          }
        }
      ]
    })
    .then(ideas => {
      return res.ok(ideas);
    })
    .catch(err => {
      return res.serverError(err);
    });
  },

  ideasAprobadas: function(req, res) {
    return Idea.findAll({
      include: [
        {model: Materia, as: 'asignaturas' },
        {model: Materia, as: 'prerrequisitos'},
        {model: Proponente, as: 'proponentes'},
        {
          model: HistorialIdea,
          as: 'historialIdea',
          where: {
            estado: 'APROBADA',
            fechaActualizacion: {
              $in: [
                sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_idea` WHERE `Idea`.`id` = `historial_idea`.`idea_id`')
              ]
            }
          }
        }
      ]
    })
    .then(ideas => {
      return res.ok(ideas);
    })
    .catch(err => {
      return res.serverError(err);
    });
  },

  ideasRechazadas: function(req, res) {
    return Idea.findAll({
      include: [
        {model: Materia, as: 'asignaturas' },
        {model: Materia, as: 'prerrequisitos'},
        {model: Proponente, as: 'proponentes'},
        {
          model: HistorialIdea,
          as: 'historialIdea',
          where: {
            estado: 'RECHAZADA',
            fechaActualizacion: {
              $in: [
                sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_idea` WHERE `idea`.`id` = `historial_idea`.`idea_id`')
              ]
            }
          }
        }
      ]
    })
    .then(ideas => {
      return res.ok(ideas);
    })
    .catch(err => {
      return res.serverError(err);
    });
  },

  aprobarIdeas: function(req, res) {
    var ideasId = null;
    var opcion = null;
    var observacion = null;

    var historialIdeas = [];
    var historial = null;
    var estado = '';

    ideasId = req.param('ideasId');
    if (!ideasId) {
      return res.badRequest({code:1, msg: 'Se deben ingresar los ids de las ideas.'});
    }

    opcion = req.param('opcion');
    if (!opcion) {
      return res.badRequest({code:1, msg: 'Se debe seleccionar una opción.'});
    }

    observacion = req.param('observacion');
    if (!observacion) {
      return res.badRequest({code:1, msg: 'Se debe ingresar una observación.'});
    }

    if (opcion == 1) {
      estado = 'APROBADA';
    } else if (opcion == 2) {
      estado = 'RECHAZADA';
    } else {
      return res.badRequest({code:2, msg: 'La opción seleccionada no es valida'});
    }

    ideasId.forEach(function (idea, i, array) {
      historial = {
        ideaId: ideasId[i],
        fechaActualizacion: new Date(),
        observacion: observacion,
        estado: estado
      };
      historialIdeas.push(historial);
    });

    HistorialIdea.bulkCreate(historialIdeas)
    .then(data => {
      return res.created();
    })
    .catch(err => {
      return res.serverError();
    });
  },

  ofertarIdea: function(req, res) {
    var ideaId = null;
    var tutores = null;
    var semestre = null;
    var ofertas = null;
    var oferta = null;

    ideaId = req.param('ideaId');
    if (!ideaId) {
      return res.badRequest({code:1, msg:'Se debe ingresar el id de la idea'});
    }

    tutores = req.param('tutores');
    if (!tutores) {
      return res.badRequest({code:1, msg:'Se debe ingresar el id de los tutores'});
    }

    semestre = req.param('semestre');
    if (!semestre) {
      return res.badRequest({code:1, msg:'Se debe ingresar el codigo del semestre'});
    }

    if (typeof tutores == 'string') {
      ofertas = {
        ideaId: ideaId,
        tutor: tutores,
        semestreCodigo: semestre,
      }
    }
    else {
      ofertas = [];
      tutores.forEach(function(tutor, i, array) {
        oferta = {
          ideaId: ideaId,
          profesorId: tutor,
          semestreCodigo: semestre
        };
        ofertas.push(oferta);
      });
    }

    Oferta.bulkCreate(ofertas)
    .then(resOferta => {
      return res.created();
    })
    .catch(err => {
      return res.serverError(err);
    });
  }
};
