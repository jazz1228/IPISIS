/**
 * MateriaCompromiso.js
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
      type: Sequelize.STRING(64),
      field: 'titulo'
    },
    descripcion: {
      type: Sequelize.TEXT,
      field: 'descripcion'
    },
<<<<<<< HEAD
    porcentaje: {
=======
    procentaje: {
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
      type: Sequelize.INTEGER,
      field: 'porcentaje'
    },
    completaEquipo: {
      type: Sequelize.BOOLEAN,
      field: 'completa_equipo'
    },
    fechaEquipo: {
      type: Sequelize.DATE,
      field: 'fecha_equipo'
    },
    adjunto: {
      type: Sequelize.BOOLEAN,
      field: 'adjunto'
    },
    completaTutor: {
      type: Sequelize.BOOLEAN,
      field: 'completa_tutor'
    },
    fechaTutor: {
      type: Sequelize.DATE,
      field: 'fecha_tutor'
    },
<<<<<<< HEAD
    calificable: {
      type: Sequelize.BOOLEAN,
      field: 'calificable'
=======
    reporte: {
      type: Sequelize.BOOLEAN,
      field: 'reporte'
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    }
  },
  // Describe las asociaciones que tiene con los demás modelos.
  associations: function () {
    MateriaCompromiso.belongsTo(Materia, {
      as: 'materia',
      foreignKey: {
        name: 'materiaCodigo',
        field: 'materia_codigo'
      }
    });

    MateriaCompromiso.belongsTo(Semestre, {
      as: 'semestre',
      foreignKey: {
        name: 'semestreCodigo',
        field: 'semestre_codigo'
      }
    });

    MateriaCompromiso.hasMany(CompromisoAdjMateria, {
      as: 'compromisoAdjMateria',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });

<<<<<<< HEAD
    MateriaCompromiso.hasMany(ProyectoCompromiso, {
      as: 'proyectoCompromiso',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });

=======
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    MateriaCompromiso.belongsToMany(Formato, {
      through: CompromisoFormato,
      as: 'formatos',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });

    MateriaCompromiso.belongsToMany(Proyecto, {
      through: ProyectoCompromiso,
      as: 'proyectos',
      foreignKey: {
        name: 'materiaCompromisoId',
        field: 'materia_compromiso_id'
      }
    });
  },
  // Configuraciones y métodos del modelo.
  options: {
    tableName: 'materia_compromiso',
    timestamps: false,
    classMethods: {},
    instanceMethods: {},
    hooks: {}
  }
};
