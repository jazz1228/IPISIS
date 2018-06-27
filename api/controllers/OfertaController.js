/**
* OfertaController
*
* @description :: Server-side logic for managing Ofertas
* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
*/
const servicioTotalCreditos = require('../services/serviciosInstitucionales/servicioTotalCreditos');
const servicioAproboMateria = require('../services/serviciosInstitucionales/servicioAproboMateria');

module.exports = {

  getAllBySemestre: function(req, res) {
    var semestre = null;

    semestre = req.param('semestreCodigo');
    if (!semestre) {
      return res.badRequest({code: 1, msg: 'Debe ingresar el semestre de las ofertas.'});
    }

    Oferta.findAll({include: [
      {model: Profesor, as: 'profesor', attributes: ['nombre']},
      {model: Semestre, as: 'semestre', where: {codigo: semestre}},
      {
        model: Idea,
        as: 'idea',
        include: [
          {model: Materia, as: 'asignaturas'},
          {model: Materia, as: 'prerrequisitos'}
        ]
      },
      {
        model: Inscripcion,
        as: 'inscripciones',
        include: [
          {
            required: false,
            model: HistorialInscripcion,
            as: 'historialInscripcion',
            where: {
              $or:[
                {estado: 'CREADA'},
                {estado: 'ACEPTADA'},
                {estado: 'FINALIZADA'}
              ],
              fechaActualizacion: {
                $in: [
                  sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_inscripcion` WHERE `inscripciones`.`id` = `historial_inscripcion`.`inscripcion_id`')
                ]
              }
            }
          }
        ]
      }
    ]})
    .then(resOfertas => {
      return res.ok(resOfertas);
    })
    .catch(err => {
      return res.serverError(err);
    });
  },

  inscribirOferta: function(req, res) {
    // Constantes de validacion.
    var MAXIMOINSCRIPCIONES = 2;

    // Parametros de entrada.
    var equipoCodigo = null;
    var ofertaId = null;
    var materiaCodigo = null;
    var estudianteId = null;

    // Variables de informacion.
    var oferta = null;
    var equipo = null;
    var estudiantes = null;

    // Inicializacion de valores.
    estudianteId = req.user.id;

    equipoCodigo = req.param('equipoCodigo');
    if (!equipoCodigo) {
      return res.badRequest({code: 1, msg: 'Debe ingresar un codigo de equipo.'});
    }

    ofertaId = req.param('ofertaId');
    if (!ofertaId) {
      return res.badRequest({code: 1, msg: 'Debe ingresar el id de la oferta.'});
    }

    materiaCodigo = req.param('materiaCodigo');
    if (!materiaCodigo) {
      return res.badRequest({code: 1, msg: 'Debe ingresar el codigo de la materia a inscribir.'});
    }

    EquipoEstudiante.findAll({where: {estadoInvitacion: 'PENDIENTE', equipoCodigo: equipoCodigo}})
    .then(resEquipoCodigo => {
      if (resEquipoCodigo.length > 0) {
        throw {code: 10, msg: 'Todos los integrantes deben aceptar la invitación al equipo.'};
      }

      // Se obtiene toda la información necesaria de la oferta que se desea inscribir.
      // (oferta, idea, prerrequisitos, asignaturas a las cuales se puede matricular,
      // semestre en el cual se está ofertando y todas inscripciones realizadas a la oferta)
      return Oferta.find({
          where: {id: ofertaId},
          include: [
            {model: Semestre, as: 'semestre'},
            {
              model: Inscripcion,
              as: 'inscripciones',
              include: [{model: HistorialInscripcion, as: 'historialInscripcion'}]
            },
            {
              model: Idea,
              as: 'idea',
              include: [
                {model: Materia, as: 'asignaturas'},
                {model: Materia, as: 'prerrequisitos'}
              ]
            },
          ]
        })
    })
    .then(resOferta => {
      var inscripcionInicio = null;
      var inscripcionCierre = null;
      var fechaActual = null;

      oferta = resOferta;
      inscripcionInicio = oferta.semestre.inscripcionInicio;
      inscripcionCierre = oferta.semestre.inscripcionCierre;
      fechaActual = new Date(Date.now() + (-300 * 60 * 1000));

      if (inscripcionInicio > fechaActual || inscripcionCierre < fechaActual) {
        throw {code: 11, msg: 'La fecha de inscripción no está activa para la oferta'};
      }


      // Luego de obtener la información de la oferta, se obtiene toda la información
      // del equipo que se está inscribiendo (equipo, inscripciones del equipo,
      // estudiantes del equipo, inscripciones de cada estudiante del equipo)
      // para realizar las validaciones necesarias.
      return Equipo.find({
        where: {codigo: equipoCodigo},
        include: [
          {
            model: Inscripcion,
            as: 'inscripciones',
            include: [
              {model: Oferta, as: 'oferta'},
              {
                model: HistorialInscripcion,
                as: 'historialInscripcion',
                where: {
                  fechaActualizacion: {
                    $in: [
                      sequelize.literal('SELECT MAX(`fecha_actualizacion`) FROM `historial_inscripcion` WHERE `inscripciones`.`id` = `historial_inscripcion`.`inscripcion_id`')
                    ]
                  }
                }
              }
            ]
          }
        ]
      });
    })
    .then(resEquipo => {
      equipo = resEquipo;
      return Equipo.find({
        where: {codigo: equipoCodigo},
        include: [
          {
            model: Estudiante,
            as: 'estudiantes',
            through: {attributes:[]},
            include: [
              {
                model: Equipo,
                as: 'equipos',
                through: {attributes:[]},
                include: [
                  {
                    model: Inscripcion,
                    as: 'inscripciones',
                    include: [{model: HistorialInscripcion, as: 'historialInscripcion'}]
                  }
                ]
              }
            ]
          }
        ]
      })
    })
    .then(resEquipo => {
      estudiantes = resEquipo.estudiantes;

      // Desde aquí se aplican todas las validaciones necesarias para permitir la
      // inscripción de un equipo a una oferta.

      // Variables de control interno.
      var valido = false;
      var inscripcion = null;
      var numInscripciones = 0;
      var estado = '';
      var estudiantesInvalidos = [];

      // Primero se valida que el usuario que inició la inscripción pertenesca
      // a el equipo ingresado.
      for (var i in estudiantes) {
        if (estudiantes[i].id == estudianteId) {
          valido = true;
        }
      }
      if (!valido) {
        throw {code: 2, msg: 'Inscripción rechazada, el estudiante no pertenece al equipo.'};
      }

      // Validamos la cantidad de miembros requeridos para la inscripción.
      if (oferta.idea.numMiembros != estudiantes.length) {
        throw {code: 3, msg: 'El equipo no cumple con la cantidad de miembros requerida.'};
      }

      // Se valida que el equipo no exceda el limite de inscripciones activas, que no
      // esté confirmado en una inscripción a una oferta o que se esté inscribiendo a la misma idea.
      if (equipo) {
        for (var i in equipo.inscripciones) {
          inscripcion = equipo.inscripciones[i];
          estado = inscripcion.historialInscripcion[0].estado.toUpperCase().trim();

          // Validación de equipo inscribiendo una idea ya inscrita.
          if (inscripcion.oferta.ideaId == oferta.ideaId && estado == 'CREADA') {
            throw {code: 4, msg: 'El equipo tiene una inscripción activa en la idea de esta oferta.'};
          }

          // Validación si el equipo se encuentra inscrito en una oferta aceptada o finalizada.
          if (estado == 'ACEPTADA' || estado == 'FINALIZADA') {
            throw {code: 5, msg: 'El equipo ya está matriculado a una oferta.'};
          }

          // Control para validación del limite de inscripciones del equipo.
          if (estado == 'CREADA') {inscripcion
            numInscripciones += 1;
            if (numInscripciones >= MAXIMOINSCRIPCIONES) {
              throw {code: 6, msg: 'El equipo ya está inscrito a la cantidad máxima de ofertas.'};
            }
          }
        }
      }

      // Se valida la cantidad de inscripciones de cada estudiante y que algún estudiante
      // no esté inscrito en una oferta aceptada para la misma asignatura. *************
      estudiantes.forEach(function (estudiante, i) {
        numInscripciones = 0;
        estudiante.equipos.forEach(function (equ, j) {
          equ.inscripciones.forEach(function (ins, k) {
            inscripcion = ins;servicioTotalCreditos
            if (inscripcion.materiaCodigo == materiaCodigo) {
              if (inscripcion.estado == 'CREADA') {
                numInscripciones += 1;
                if (numInscripciones >= MAXIMOINSCRIPCIONES) {
                  estudiantesInvalidos.push({nombre: estudiante.nombre, identificacion: estudiante.identificacion});
                }
              }
              else if (inscripcion.estado == 'ACEPTADA') {
                estudiantesInvalidos.push({nombre: estudiante.nombre, identificacion: estudiante.identificacion});
              }
            }
          });
        });
      });

      if (estudiantesInvalidos.length != 0) {
        throw {
          code: 7,
          msg: 'Algunos de los estudiantes no cumplen los requisitos para la inscripcion.',
          estudiantes: estudiantesInvalidos
        }
      }

      estudiantes.forEach(function(estudiante, i) {
        // Validamos la cantidad de creditos de cada estudiante.
        valido = validarCreditos(estudiante.identificacion);
        if (valido=='err') {
          throw {
            code: 12,
            msg: 'Ha ocurrido un error interno, por favor intentelo más tarde',
            estudiante: estudiante
          };
        }
        if (!valido) {
          throw {
            code: 8,
            msg: 'El estudiante ' + estudiante.nombre + ' no cumple con la cantidad de creditos.',
            estudiante: estudiante
          };
        }

        // Validamos los prerrequisitos de cada integrante;
        valido = validarPrerrequisitos(estudiante.identificacion, oferta.idea.prerrequisitos);
        if (!valido) {
          throw {
            code: 9,
            msg: 'El estudiante ' + estudiante.nombre + ' no cumple los prerrequisitos',
            estudiante: estudiante
          };
        }
      });

      return sequelize.transaction( t => {
        var inscripcion = {
          fechaCreacion: new Date(Date.now() + (-300 *60 * 1000)),
          equipoCodigo: equipoCodigo,
          ofertaId: ofertaId,
          materiaCodigo: materiaCodigo
        }
        return Inscripcion.create(inscripcion, {transaction: t}).then(resInscripcion => {
          var historial = {
            fechaActualizacion: new Date(Date.now() + (-300 *60 * 1000)),
            observacion: 'Inscripción creada.',
            estado: 'CREADA',
          }
          return HistorialInscripcion.create(historial, {transaction: t}).then(resHistorial => {
            return resInscripcion.addHistorialInscripcion(resHistorial, {transaction: t});
          });
        });
      })
    })
    .then(resultado => {
      return res.created();
    })
    .catch(err => {
      if (err.code == 2) {
        return res.forbidden();
      }
      else if (err.code) {
        return res.badRequest(err);
      }
      else {
        return res.serverError(err);
      }
    });
  }
};

function validarCreditos(cedula) {
  if (cedula) {
    let nombre_sevicio="consultainformacionacademicamares";
    let informacionAcademicaUsuario = servicioTotalCreditos(nombre_sevicio,"cedula",cedula)
    if (informacionAcademicaUsuario==='[]'||informacionAcademicaUsuario==null||informacionAcademicaUsuario==undefined) {
      return 'err';
    }
    let obj = JSON.parse(informacionAcademicaUsuario);
    if(obj[0].creditosAcumulados>=100){
         return true;
     }
  }
  return false;
}

function validarPrerrequisitos(cedula, prerrequisitos) {
  const programa="504";
  let nombre_sevicio="consultaestudianteaprobomateriamares";
  let codigo_materia= "";
  for (var i = 0; i < prerrequisitos.length; i++) {
    codigo_materia = prerrequisitos[i].dataValues.codigo.toString();
    let informacionPrerrequisitoEstudiante = servicioAproboMateria(nombre_sevicio,"cedula","programa","materia",cedula,programa,codigo_materia);
    if (informacionPrerrequisitoEstudiante=== 'N') {
      return false;
    }
  }
  return true;
}
