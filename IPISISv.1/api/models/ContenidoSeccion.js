/**
 * ContenidoSeccion.js
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
      fechaEquipo: {
        type: Sequelize.DATE,
        field: 'fecha_equipo'
      },
      fechaTutor: {
        type: Sequelize.DATE,
        field: 'fecha_tutor'
      },
      estado: {
        type: Sequelize.STRING(64),
        field: 'estado'
      },
      texto: {
        type: Sequelize.TEXT,
        field: 'texto'
      },
      nota: {
        type: Sequelize.DOUBLE,
        field: 'nota'
      },
    },
    // Describe las asociaciones que tiene con los demás modelos.
    associations: function () {
  
      ContenidoSeccion.belongsTo(ProyectoCompromiso, {
        as: 'proyectoCompromiso',
        foreignKey: {
          name: 'proyectoCompromisoId',
          field: 'proyecto_compromiso_id' 
        }
      });
  
      ContenidoSeccion.belongsTo(Seccion, {
        as: 'seccion',
        foreignKey: {
          name: 'seccionId',
          field: 'seccion_id' 
        }
      });
    },
    // Configuraciones y métodos del modelo.
    options: {
      tableName: 'contenido_seccion',
      timestamps: false,
      classMethods: {},
      instanceMethods: {},
      hooks: {}
    }
};

