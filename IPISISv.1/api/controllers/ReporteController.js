/**
 * ReporteController
 *
 * @description :: Server-side logic for managing Reporte
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports= {
  proyectosAsignados: function (req, res) {

//let consulta = `SELECT DISTINCT p.grupo_mares, p.nombre AS 'proyecto', est.nombre AS 'estudiante' , est.correo AS 'estudiante_email', prof.nombre AS 'tutor', prof.correo AS 'tutor_email', hi.estado, hi.observacion, hi.fecha_actualizacion FROM proyecto p INNER JOIN inscripcion i ON p.inscripcion_id = i.id INNER JOIN historial_inscripcion hi ON hi.inscripcion_id = i.id AND hi.estado = :aceptada OR hi.estado = :rechazada INNER JOIN oferta o ON i.oferta_id = o.id INNER JOIN profesor prof ON prof.id = o.profesor_id INNER JOIN equipo eq ON i.equipo_codigo = eq.codigo INNER JOIN equipo_estudiante ee ON eq.codigo = ee.equipo_codigo INNER JOIN estudiante est ON ee.estudiante_id = est.id`;
let consulta = `SELECT DISTINCT p.grupo_mares, p.nombre AS 'proyecto', est.nombre AS 'estudiante' , est.correo AS 'estudiante_email', prof.nombre AS 'tutor', prof.correo AS 'tutor_email', hi.estado, hi.observacion, hi.fecha_actualizacion
FROM proyecto p
INNER JOIN inscripcion i ON p.inscripcion_id = i.id
INNER JOIN equipo eq ON i.equipo_codigo = eq.codigo
INNER JOIN equipo_estudiante ee ON eq.codigo = ee.equipo_codigo
INNER JOIN estudiante est ON ee.estudiante_id = est.id
INNER JOIN oferta o ON i.oferta_id = o.id
INNER JOIN profesor prof ON prof.id = o.profesor_id
INNER JOIN historial_inscripcion hi ON hi.inscripcion_id = i.id AND hi.estado = :aceptada OR hi.inscripcion_id = i.id AND hi.estado = :rechazada`;

sequelize.query(consulta, { replacements: { aceptada: 'ACEPTADA' , rechazada: 'RECHAZADA'}, type: sequelize.QueryTypes.SELECT})
  .then(reporte => {
    return res.json(reporte);
}).catch(err => {
  return res.serverError(err);
});

  }
}
