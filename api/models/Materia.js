/**
 * Materia.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    codigo: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      field: 'codigo'
    },
    nombre: {
      type: Sequelize.STRING(128),
      field: 'nombre'
    },
    electiva: {
      type: Sequelize.BOOLEAN,
      field: 'electiva'
    },
    adminProyecto: {
      type: Sequelize.BOOLEAN,
      field: 'admin_proyecto'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Materia.belongsTo(Area, {
      as: 'area',
      foreignKey: {
        name: 'areaId',
        field: 'area_id'
      }
    });

    Materia.hasMany(Inscripcion, {
      as: 'inscripciones',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    Materia.hasMany(Preinscripcion, {
      as: 'preinscripciones',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    Materia.belongsToMany(Idea, {
      through: IdeaMateria,
      as: 'ideas',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    Materia.belongsToMany(Idea, {
      through: Prerrequisito,
      as: 'ideas',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'materia',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
