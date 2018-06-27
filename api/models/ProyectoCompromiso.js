/**
 * ProyectoCompromiso.js
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
    observacion: {
      type: Sequelize.TEXT,
      field: 'observacion'
    },
<<<<<<< HEAD
    nota: {
      type: Sequelize.DOUBLE,
      field: 'nota'
    },
=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
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
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    ProyectoCompromiso.hasMany(CompromisoAdjProyecto, {
      as: 'compromisoAdjProyecto',
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });

<<<<<<< HEAD
    ProyectoCompromiso.hasMany(Calificacion, {
      as: 'calificaciones',
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });

    ProyectoCompromiso.belongsToMany(Seccion, {
      through: ContenidoSeccion,
      as: 'secciones',
=======
    ProyectoCompromiso.belongsToMany(Formato, {
      through: SeguimientoFormato,
      as: 'formatos',
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
      foreignKey: {
        name: 'proyectoCompromisoId',
        field: 'proyecto_compromiso_id'
      }
    });
<<<<<<< HEAD


    ProyectoCompromiso.belongsTo(MateriaCompromiso, {
      as: 'materiaCompromiso',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });

    ProyectoCompromiso.belongsTo(Proyecto, {
      as: 'proyecto',
      foreignKey: {
        name: 'proyectoId',
        field: 'proyecto_id'
      }
    });
=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'proyecto_compromiso',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
