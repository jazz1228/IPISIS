/**
 * Formato.js
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
      type: Sequelize.STRING(128),
      field: 'titulo'
    },
    fechaCreacion: {
      type: Sequelize.DATE,
      field: 'fecha_creacion'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    Formato.hasMany(Seccion, {
      as: 'secciones',
      foreignKey: {
        name: 'formatoId',
        field: 'formato_id'
      }
    });

    Formato.belongsToMany(MateriaCompromiso, {
      through: CompromisoFormato,
      as: 'materiaCompromisos',
      foreignKey: {
        name: 'formadoId',
        field: 'formato_id'
      }
    });

    Formato.belongsToMany(ProyectoCompromiso, {
      through: SeguimientoFormato,
      as: 'proyectoCompromisos',
      foreignKey: {
        name: 'formatoId',
        field: 'formato_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'formato',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
