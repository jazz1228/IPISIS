/**
 * ProfesorRolCalificacion.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    rolProfesor: {
      type: Sequelize.STRING(15),
      required: true,
      field: 'rol_profesor'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    ProfesorRolCalificacion.belongsTo(Proyecto, {
      as: 'proyecto',
      foreignKey: {
        name: 'proyectoId',
        field: 'proyecto_id'
      }
    });

    ProfesorRolCalificacion.belongsTo(Profesor, {
      as: 'profesor',
      foreignKey: {
        name: 'profesorId',
        field: 'profesor_id'
      }
    });

    ProfesorRolCalificacion.hasMany(Calificacion, {
      as: 'calificaciones',
      foreignKey: {
        name: 'profesorRolCalificacionId',
        field: 'profesor_rol_calificacion_id'
      }
    });

  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'profesor_rol_calificacion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};

