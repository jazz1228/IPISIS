/**
 * HistorialInscripcion.js
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
    observacion: {
      type: Sequelize.TEXT,
      field: 'observacion'
    },
    estado: {
      type: Sequelize.STRING(28),
      required: true,
      field: 'estado'
    },
    fechaActualizacion: {
      type: Sequelize.DATE,
      required: true,
      field: 'fecha_actualizacion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    HistorialInscripcion.belongsTo(Inscripcion, {
      as: 'inscripcion',
      foreignKey: {
        name: 'inscripcionId',
        field: 'inscripcion_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'historial_inscripcion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
