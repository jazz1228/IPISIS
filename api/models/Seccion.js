/**
 * Seccion.js
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
    orden: {
      type: Sequelize.INTEGER,
      field: 'orden'
    },
    nombre: {
      type: Sequelize.STRING(128),
      field: 'nombre'
    },
    guia: {
      type: Sequelize.TEXT,
      field: 'guia'
    },
    peso: {
      type: Sequelize.DOUBLE,
      field: 'peso'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Seccion.belongsTo(Formato, {
      as: 'formato',
      foreignKey: {
        name: 'formatoId',
        field: 'formato_id'
      }
    });
    Seccion.belongsToMany(ProyectoCompromiso, {
      through: ContenidoSeccion,
      as: 'proyectoCompromisos',
      foreignKey: {
        name: 'seccionId',
        field: 'seccion_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'seccion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
