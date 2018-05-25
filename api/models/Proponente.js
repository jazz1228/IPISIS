/**
 * Tipo_proponente.js
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
    tipo: {
      type: Sequelize.STRING(32),
      field: 'tipo'
    },
  	nombre: {
      type: Sequelize.STRING(128),
      field: 'nombre'
    },
    correo: {
      type: Sequelize.STRING(128),
      field: 'correo'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Proponente.belongsTo(Idea, {
      as: 'idea',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'proponente',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
