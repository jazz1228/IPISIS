/**
 * Calificacion.js
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
    nota: {
      type: Sequelize.DOUBLE(),
      required: true,
      field: 'nota'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Calificacion.belongsTo(ProfesorRolCalificacion, {
      as: 'rolProfesor',
      foreignKey: {
        name: 'ProfesorRolCalificacionId',
        field: 'Profesor_rol_calificacion_id'
      }
    });

    Calificacion.belongsTo(Estudiante, {
      as: 'estudiante',
      foreignKey: {
        name: 'estudianteId',
        field: 'estudiante_id'
      }
    });

    Calificacion.belongsTo(ProyectoCompromiso, {
      as: 'proyectoCompromiso',
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'calificacion',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
