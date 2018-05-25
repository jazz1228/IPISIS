/**
 * CompromisoFormato.js
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
    completaEquipo: {
      type: Sequelize.BOOLEAN,
      field: 'completa_equipo'
    },
    completaTutor: {
      type: Sequelize.BOOLEAN,
      field: 'completa_tutor'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {

  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'compromiso_formato',
    underscored: true,
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
