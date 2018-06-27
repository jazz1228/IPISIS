/**
 * Profesor.js
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
    nombreUsuario: {
      type: Sequelize.STRING(128),
      required: true,
      field: 'nombre_usuario'
    },
    nombre: {
      type: Sequelize.STRING(128),
      required: true,
      field: 'nombre'
    },
    tipo: {
      type: Sequelize.STRING(16),
      field: 'tipo'
    },
    correo: {
      type: Sequelize.STRING(256),
      field:'correo'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Profesor.hasMany(Oferta, {
      as: 'ofertas',
      foreignKey: {
        name: 'profesorId',
        field: 'profesor_id'
      }
    });

    Profesor.hasMany(ProfesorRolCalificacion, {
      as: 'rolProfesor',
      foreignKey: {
        name: 'profesorId',
        field: 'profesor_id'
     } 
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'profesor',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
