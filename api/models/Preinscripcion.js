/**
 * Preinscripcion.js
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
    },
    fechaCreacion: {
      type: Sequelize.DATE,
      required: true,
      field: 'fecha_creacion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Preinscripcion.belongsTo(Equipo, {
      as: 'equipo',
      foreignKey: {
        name: 'equipoCodigo',
        field: 'equipo_codigo'
      }
    });

    Preinscripcion.belongsTo(Materia, {
      as: 'materia',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    Preinscripcion.belongsTo(Idea, {
      as: 'idea',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Preinscripcion.belongsTo(Semestre, {
      as: 'semestre',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'preinscripcion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
