/**
 * Estudiante.js
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
      field:'id'
    },
    identificacion: {
      type: Sequelize.STRING(16),
      required: true,
      field:'identificacion'
    },
    nombreUsuario: {
      type: Sequelize.STRING(128),
      required: true,
      field:'nombre_usuario'
    },
    nombre: {
      type: Sequelize.STRING(128),
      required: true,
      field:'nombre'
    },
    correo: {
      type: Sequelize.STRING(256),
      field:'correo'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Estudiante.belongsToMany(Equipo, {
      through: EquipoEstudiante,
      as: 'equipos',
      foreignKey: {
        name: 'estudianteId',
        field: 'estudiante_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'estudiante',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
