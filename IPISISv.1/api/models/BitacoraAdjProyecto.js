/**
 * BitacoraAdjProyecto.js
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
    nombreReal: {
      type: Sequelize.STRING(128),
      field: 'nombre_real'
    },
    uri: {
      type: Sequelize.STRING(256),
      field: 'uri'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    BitacoraAdjProyecto.belongsTo(Bitacora, {
      as: 'bitacora',
      foreignKey: {
        name: 'bitacoraId',
        field: 'bitacora_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'bitacora_adj_proyecto',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

