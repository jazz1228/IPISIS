/**
 * Bitacora.js
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
    fecha: {
      type: Sequelize.DATE,
      field: 'fecha'
    },
    contenido_reunion: {
      type: Sequelize.TEXT,
      field: 'contenido_reunion'
    },
    compromisos: {
      type: Sequelize.TEXT,
      field: 'compromisos'
    },
    dificultades: {
      type: Sequelize.TEXT,
      field: 'dificultades'
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    
    Bitacora.hasMany(BitacoraAdjProyecto, {
      as: 'bitacoraAdjProyecto',
      foreignKey: {
        name: 'bitacoraId',
        field: 'bitacora_id' 
      }
    });
    Bitacora.belongsTo(Proyecto, {
      as: 'proyecto',
      foreignKey: {
        name: 'proyectoId',
        field: 'proyecto_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'bitacora',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }

};

