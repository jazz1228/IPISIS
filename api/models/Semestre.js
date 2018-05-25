/**
 * Semestre.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    codigo: {
      type: Sequelize.STRING(8),
      primaryKey: true,
      field: 'codigo'
    },
    semestreInicio: {
      type: Sequelize.DATE,
      field: 'semestre_inicio'
    },
    semestreCierre: {
      type: Sequelize.DATE,
      field: 'semestre_cierre'
    },
    inscripcionInicio: {
      type: Sequelize.DATE,
      field: 'inscripcion_inicio'
    },
    inscripcionCierre: {
      type: Sequelize.DATE,
      field: 'inscripcion_cierre'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Semestre.hasMany(Oferta, {
      as: 'ofertas',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });

    Semestre.hasMany(MateriaCompromiso, {
      as: 'materiaCompromisos',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });

    Semestre.hasMany(Preinscripcion, {
      as: 'preinscripciones',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'semestre',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
