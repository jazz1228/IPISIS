/**
 * Equipo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    codigo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'codigo'
    },
    nombre: {
      type: Sequelize.STRING(128),
      field: 'nombre'
    },
    fechaCreacion: {
      type: Sequelize.DATE,
      required: true,
      field: 'fecha_creacion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Equipo.hasMany(Preinscripcion, {
      as: 'preinscripciones',
      foreignKey: {
        name: 'equipoCodigo',
        field: 'equipo_codigo'
      }
    });

    Equipo.hasMany(Inscripcion, {
      as: 'inscripciones',
      foreignKey: {
        name: 'equipoCodigo',
        field: 'equipo_codigo'
      }
    });

    Equipo.belongsToMany(Estudiante, {
      through: EquipoEstudiante,
      as: 'estudiantes',
      foreignKey: {
        name: 'equipoCodigo',
        field: 'equipo_codigo'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'equipo',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
