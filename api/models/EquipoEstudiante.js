/**
 * EquipoEstudiante.js
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
    estadoInvitacion: {
      type: Sequelize.STRING(16),
      field: 'estado_invitacion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {

  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'equipo_estudiante',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
