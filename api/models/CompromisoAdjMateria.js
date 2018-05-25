/**
 * CompromisoAdjMateria.js
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
    nombre: {
      type: Sequelize.STRING(128),
      field: 'nombre'
    },
    uri: {
      type: Sequelize.STRING(256),
      field: 'uri'
    },
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    CompromisoAdjMateria.belongsTo(MateriaCompromiso,{
      as: 'materiaCompromiso',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'compromiso_adj_materia',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
