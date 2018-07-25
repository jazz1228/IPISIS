/**
 * Oferta.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Oferta.belongsTo(Idea, {
      as: 'idea',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Oferta.belongsTo(Semestre, {
      as: 'semestre',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });

    Oferta.belongsTo(Profesor, {
      as: 'profesor',
      foreignKey: {
        name: 'profesorId',
        field: 'profesor_id'
      }
    });

    Oferta.hasMany(Inscripcion, {
      as: 'inscripciones',
      foreignKey: {
        name: 'ofertaId',
        field: 'oferta_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'oferta',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
