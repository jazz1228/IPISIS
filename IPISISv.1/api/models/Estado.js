/**
 * Estado.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'id'
    },
    descripcion: {
      type: Sequelize.TEXT,
      field: 'descripcion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {

  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'estado',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
