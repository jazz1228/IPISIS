/**
 * FormatoController
 *
 * @description :: Server-side logic for managing formatoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function (req, res) {
        let titulo_formato = null;
        let fecha_creacion = null;
        let formato = null;
        let secciones = [];
        let encabezado = null;
        let piePagina = null; 
        let tipoActa = null; 
    
        titulo_formato = req.param('titulo_formato');
        if (!titulo_formato ||  titulo_formato==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el título del formato'});
        }
        encabezado = req.param('encabezado');
        if (!encabezado ||  encabezado==='null') {
            encabezado= ' ';
        }
    
        piePagina = req.param('piePagina');
        if (!piePagina ||  piePagina==='null') {
            piePagina= ' ';
        }

        tipoActa = req.param('tipoActa');
        if (!tipoActa ||  tipoActa==='null') {
            tipoActa= false;
        }

        fecha_creacion = req.param('fecha_creacion');
        if (!fecha_creacion||  fecha_creacion==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la fecha de creación'});
        }
    
        secciones = req.param('secciones');
        if (!secciones ||  secciones==='null') {
            return res.badRequest({code:1, msg: 'Se deben ingresar las secciones para el formato'});
        }

        formato = {
            titulo: titulo_formato,
            encabezado: encabezado,
            piePagina: piePagina,
            tipoActa: tipoActa,
            fechaCreacion: fecha_creacion
        }

        sequelize.transaction(function(t) {  
            return Formato.create(formato, {transaction: t}).then(formato => {  
                secciones.forEach(function (seccionItem, i, array) {
                    seccionItem.formatoId = formato.get('id');
                  }); 
                  return Seccion.bulkCreate(secciones, {transaction: t}).then((secciones) => {
                    return formato.addSecciones(secciones, {transaction: t})
                  });     
            });
        }).then(result => {
                return res.created();
            })
            .catch(err => {
                return res.serverError(err)
        }); 
    },

    getAll: function (req, res) {
        return Formato.findAll({
            include: {
                model: Seccion, as: 'secciones'
            }
        }).then(formatos =>{
            res.ok(formatos);
        })
        .catch(err => {
            return res.serverError(err);
          })      
    },

    getById: function (req, res) {
        let formato_id = null;

        formato_id = req.param('formato_id');
        if (!formato_id) {
            return res.badRequest({code:1, msg: 'Se debe ingresar  el código del formato'});
        }

        return Formato.findOne({
            where: {id: formato_id },
            include: {
                model: Seccion, as: 'secciones'
            }
        }).then(formatos =>{
            res.ok(formatos);
        })
        .catch(err => {
            return res.serverError(err);
          })      
    },

    update: function (req, res) {
        let formato_id = null;
        let titulo_formato = null;
        let fecha_creacion = null;
        let formato = null;
        let id_secciones = [];
        let secciones = []; 
    
        titulo_formato = req.param('titulo_formato');
        if (!titulo_formato ||  titulo_formato==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el título del formato'});
        }
    
        fecha_creacion = req.param('fecha_creacion');
        if (!fecha_creacion||  fecha_creacion==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la fecha de creación'});
        }
    
        secciones = req.param('secciones');
        if (!secciones ||  secciones==='null') {
            return res.badRequest({code:1, msg: 'Se deben ingresar las secciones para el formato'});
        }

        formato_id = req.param('formato_id');
        if (!formato_id || formato_id=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar  el código del formato'});
        }
        
        formato = {
            titulo: titulo_formato,
            fechaCreacion: fecha_creacion
        }
        
        Formato.findOne({
            include: {
                model: Seccion, as: 'secciones'
            },
            where: {id: formato_id }
        }).then(resFormato =>{

            resFormato.secciones.forEach(function (seccionItem, i, array) {
                id_secciones.push(seccionItem.id);
            })

            sequelize.transaction(function(t) {  
              return  Seccion.destroy({where: {id: { in:id_secciones}}}, {transaction: t}).then(seccionDestroy=>{
                return Formato.update(formato,{where: {id: formato_id }}, {transaction: t}).then(formato => { 
                    secciones.forEach(function (seccionItem, i, array) {
                        seccionItem.formatoId = formato_id;
                      }); 
                      return Seccion.bulkCreate(secciones, {transaction: t}).then(secciones => {
                          return Formato.findOne({where: {id: formato_id}}, {transaction: t}).then(formato=>{
                            return formato.addSecciones(secciones, {transaction: t})
                          });
                      });     
                });
              });
            }).then(result => {
                    return res.created();
                })
                .catch(err => {
                    return res.serverError(err)
            }); 
        })
    },

    delete: function(req,res){
        let formato_id = null;
        let seccionesDelete = [];

        formato_id = req.param('formato_id');
        if (!formato_id) {
            return res.badRequest({code:1, msg: 'Se debe ingresar  el código del formato'});
        }

        Seccion.findAll({where: {formatoId:formato_id }}).then(secciones =>{
            secciones.forEach(function(seccion){
                seccionesDelete.push(seccion.id);
            });
            sequelize.transaction(function(t) {  
                return  Seccion.destroy({where: {id: { in: seccionesDelete}}}, {transaction: t}).then(seccionesDestroy=>{
                    return Formato.destroy({where: {id: formato_id}}, {transaction: t});
                 });   
            });    
        }).then(resSecciones=>{
            return res.ok();
        })
        .catch(err =>{
            if (err.code) {
                return res.badRequest(err);
            }
            return res.serverError(err);
        })
    }
};
