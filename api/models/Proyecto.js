/**
 * Proyecto.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
<<<<<<< HEAD

=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
  attributes: {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    nombre: {
      type: Sequelize.STRING(256),
      field: 'nombre'
    },
    grupoMares: {
      type: Sequelize.STRING(16),
      field: 'grupo_mares'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Proyecto.belongsTo(Inscripcion, {
      as: 'inscripcion',
      foreignKey: {
        name: 'inscripcionId',
        field: 'inscripcion_id'
      }
    });
<<<<<<< HEAD
    Proyecto.hasMany(Bitacora, {
      as: 'bitacora',
      foreignKey: {
        name: 'proyectoId',
        field: 'proyecto_id'
      }
    });
=======

>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    Proyecto.belongsToMany(MateriaCompromiso, {
      through: ProyectoCompromiso,
      as: 'materiaCompromisos',
      foreignKey: {
        name: 'proyectoId',
        field: 'proyecto_id'
      }
    });
<<<<<<< HEAD
    Profesor.hasMany(ProfesorRolCalificacion, {
      as: 'rolProfesor',
      foreignKey: {
        name: 'profesorId',
        field: 'profesor_id'
     } 
    });
=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'proyecto',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
<<<<<<< HEAD

=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
