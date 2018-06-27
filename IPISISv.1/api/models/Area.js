/**
 * Area.js
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
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Area.hasMany(Materia, {
      as: 'materias',
      foreignKey: {
        name: 'areaId',
        field: 'area_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'area',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
