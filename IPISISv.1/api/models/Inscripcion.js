/**
 * Inscripcion.js
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
    Inscripcion.belongsTo(Equipo, {
      as: 'equipo',
      foreignKey: {
        name: 'equipoCodigo',
        field: 'equipo_codigo'
      }
    });

    Inscripcion.belongsTo(Oferta, {
      as: 'oferta',
      foreignKey: {
        name: 'ofertaId',
        field: 'oferta_id'
      }
    });

    Inscripcion.belongsTo(Materia, {
      as: 'materia',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    Inscripcion.hasOne(Proyecto, {
      as: 'proyecto',
      foreignKey: {
        name: 'inscripcionId',
        field: 'inscripcion_id'
      }
    });

    Inscripcion.hasMany(HistorialInscripcion, {
      as: 'historialInscripcion',
      foreignKey: {
        name: 'inscripcionId',
        field: 'inscripcion_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'inscripcion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
