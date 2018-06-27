/**
 * Idea.js
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
    titulo: {
      type: Sequelize.STRING(256),
      field: 'titulo'
    },
    descripcion: {
      type: Sequelize.TEXT,
      field: 'descripcion'
    },
    numMiembros: {
      type: Sequelize.INTEGER,
      field: 'num_miembros'
    },
    numEquipos: {
      type: Sequelize.INTEGER,
      field: 'num_equipos'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Idea.hasMany(Oferta, {
      as: 'ofertas',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Idea.hasMany(Preinscripcion, {
      as: 'preinscripciones',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Idea.hasMany(HistorialIdea, {
      as: 'historialIdea',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Idea.hasMany(Proponente, {
      as: 'proponentes',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Idea.belongsToMany(Materia, {
      through: IdeaMateria,
      as: 'asignaturas',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });

    Idea.belongsToMany(Materia, {
      through: Prerrequisito,
      as: 'prerrequisitos',
      foreignKey: {
        name: 'ideaId',
        field: 'idea_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'idea',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
