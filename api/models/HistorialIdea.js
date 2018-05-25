/**
 * Historial_idea.js
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
  	fechaActualizacion: {
  		type: Sequelize.DATE,
      field: 'fecha_actualizacion'
  	},
		observacion: {
			type: Sequelize.TEXT,
      field: 'observacion'
		},
		estado: {
			type: Sequelize.STRING(28),
      field: 'estado'
		}
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    HistorialIdea.belongsTo(Idea, {
      as: 'idea',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'historial_idea',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
}
