/**
 * EquipoEstudiante.js
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
    estadoInvitacion: {
      type: Sequelize.STRING(16),
      field: 'estado_invitacion'
<<<<<<< HEAD
    },
    estadoActa: {
      type: Sequelize.STRING(16),
      field: 'estado_acta'
=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
<<<<<<< HEAD
   EquipoEstudiante.belongsTo(Estudiante, {
        as: 'estudiante',
        foreignKey: {
          name: 'estudianteId',
          field: 'estudiante_id'
        }
      });
=======

>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'equipo_estudiante',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
