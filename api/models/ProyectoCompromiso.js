/**
 * ProyectoCompromiso.js
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
    fechaEquipo: {
      type: Sequelize.DATE,
      field: 'fecha_equipo'
    },
    fechaTutor: {
      type: Sequelize.DATE,
      field: 'fecha_tutor'
    },
    estado: {
      type: Sequelize.STRING(64),
      field: 'estado'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    ProyectoCompromiso.hasMany(CompromisoAdjProyecto, {
      as: 'compromisoAdjProyecto',
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });

    ProyectoCompromiso.belongsToMany(Formato, {
      through: SeguimientoFormato,
      as: 'formatos',
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'proyecto_compromiso',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
