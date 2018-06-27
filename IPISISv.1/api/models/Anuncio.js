/**
 * Anuncio.js
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
      allowNull: false,
      unique: true,
      field: 'id'
    },
    fechaCreacion: {
      type: Sequelize.DATE,
      field:'fecha_creacion'
    },
    fechaModificacion: {
      type: Sequelize.DATE,
      field:'fecha_modificacion'
    },
    contenido: {
      type: Sequelize.TEXT,
      field:'contenido'
    }
  },
  // Referencias a modelos, asociaciones.
  associations: function() {

  },
  options: {
    tableName: 'anuncio',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  },
};
