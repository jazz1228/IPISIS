/**
 * PreinscripcionController
 *
 * @description :: Server-side logic for managing preinscripcions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  preinscribir: function(req, res) {
    var MAXPREINSCRIPCIONES = 2;
    var user = req.user;
    var equipoCodigo = req.param('equipoCodigo')
    var ideaId = req.param('ideaId');
    var asignaturaCodigo = req.param('asignaturaCodigo');

    Preinscripcion.find({
      equipoCodigo: equipoCodigo
    })
    .then(function(data) {
      if (data.length >= MAXPREINSCRIPCIONES) {
        throw {
          code: 1,
          msg: 'El equipo ha alcanzado el número máximo de preinscipciones.'
        }
      }

      data.forEach(function (preinscripcion, index) {
        if (preinscripcion.ideaId == ideaId) {
          throw {
            code: 2,
            msg: 'El equipo ya está preinscrito a esta idea.'
          }
        }
      });
      return Preinscripcion.create({
        ideaId: ideaId,
        equipoCodigo: equipoCodigo,
        fechaCreacion: Date(),
        semestreCodigo: '2017-1'
      });
    })
    .then(function(data) {
      if (!data) {
        res.serverError();
      }
      res.ok();
    })
    .catch(function(err) {
      if (err.code) {
        return res.badRequest(err);
      } else {
        return res.serverError(err);
      }
    });
  },

  getPreinscripcionesBySemestre: function(req, res) {
    var semestreCodigo = null;

    semestreCodigo = req.param('semestreCodigo');
    if (!semestreCodigo) {
      return res.badRequest({code: 1, msg: 'Debe ingresar el código del semestre.'});
    }

    Preinscripcion.findAll({
      where: {semestreCodigo: semestreCodigo},
      include: [
        {model: Equipo, as: 'equipo'},
        {model: Idea, as: 'idea'}
      ]
    })
    .then(resPreinscripciones => {
      return res.ok(resPreinscripciones);
    })
    .catch(err => {
      return res.serverError(err);
    });
  }
};
