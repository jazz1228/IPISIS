/**
 * MateriaCompromisoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const path = require('path');

module.exports = {
  
    create: function (req,res) {
        let titulo = null;
        let descripcion = null;
        let porcentaje = null;
        let completaEquipo = false;
        let fechaEquipo = null;
        let adjunto = false;
        let completaTutor = false;
        let fechaTutor = null;
        let calificable = false;
        let materia_id = false;
        let semestre_id = false;
        let formato_id = false;
        let materiaCompromiso = null;
        let compromisoFormato = null;
        let cod= 0;
        let anexos = null;
        let compromisoAdj = null;
        let compromisosAdjs = [];

        titulo = req.param('titulo');    
        if (!titulo || titulo==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el titulo del compromiso'});
        }

        descripcion = req.param('descripcion');    
        if (!descripcion  || descripcion==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la descripcion del compromiso'});
        }

        porcentaje = req.param('porcentaje');    
        if (!porcentaje) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el porcentaje del compromiso'});
        }
        if(porcentaje=='null'){
         porcentaje=0;
        }

        materia_id = req.param('materia_id');    
        if (!materia_id ||  materia_id==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la materia para el compromiso'});
        }

         semestre_id = req.param('semestre_id');    
        if (!semestre_id ||  semestre_id==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el  semestre'});
        }
        
        formato_id = req.param('formato_id');    
        if (!formato_id ||  formato_id==='false'|| formato_id==='null') {    
            return res.badRequest({code:1, msg: 'Se debe ingresar un formato formato'});
        }

        completaEquipo = req.param('completaEquipo');
        if(!completaEquipo || completaEquipo=='null'){
            completaEquipo= false;
        } 

        fechaEquipo = req.param('fechaEquipo');
        if(!fechaEquipo || fechaEquipo == 'null'){
           fechaEquipo = '0000-00-00';
        }  

        adjunto = req.param('adjunto'); 
        if(!adjunto || adjunto == 'null'){
          adjunto= false;
        }

        completaTutor = req.param('completaTutor');
        if(!completaTutor || completaTutor== 'null'){
            completaTutor= false;
        } 

        fechaTutor = req.param('fechaTutor'); 
        if(!fechaTutor || fechaTutor== 'null'){
            fechaTutor = '0000-00-00';
        }
        calificable = req.param('calificable');
        if(!calificable || calificable== 'null'){
        calificable= false;
        } 
        
        materiaCompromiso= {
            titulo:titulo,
            descripcion: descripcion,
            porcentaje: porcentaje,
            completaEquipo:completaEquipo,
            fechaEquipo:fechaEquipo,
            adjunto:adjunto,
            completaTutor:completaTutor,
            fechaTutor: fechaTutor,
            calificable:calificable,
            materiaCodigo:materia_id,
            semestreCodigo: semestre_id
        }

	
        compromisoFormato = {
            formatoId: formato_id,
            completaEquipo: completaEquipo,
            completaTutor: completaTutor
        }

        anexos= req.file('anexos');

        anexos.upload({
            noop: true,
            maxBytes: 250000000000,
            dirname: process.cwd() +  `/assets/formatos`,
            saveAs: function (__newFileStream, cb) {
                cb(null, `${titulo}_${materia_id}`+ cod++ + path.extname(__newFileStream.filename));
            }
        }, function (err, files) {
           if (err) {
              return res.serverError(err); 
            } 
           if (files.length === 0) {
                sequelize.transaction(function(t) {  
                    return MateriaCompromiso.create(materiaCompromiso,{transaction: t}).then(materiaComp => {
                        compromisoFormato.materiaCompromisoId = materiaComp.get('id');
                        return CompromisoFormato.create(compromisoFormato,{transaction: t})
                    }) 
                }).then(result => {
                    return res.created();
                }) .catch(err => {
                    return res.serverError(err)
                });
            }else{//Si hay archivos adjuntos

                files.forEach(function(file) {  
                    compromisoAdj = {
                        nombre: file.fd.substring(file.fd.lastIndexOf('/')+1),
                        uri: file.fd,
                        nombreReal: file.filename,
                        tipoArchivo: file.type
                
                        }
                    compromisosAdjs.push(compromisoAdj);
                });

                sequelize.transaction(function(t) {  
                    return MateriaCompromiso.create(materiaCompromiso,{transaction: t}).then(materiaComp => {
                        compromisoFormato.materiaCompromisoId = materiaComp.get('id');
                        return CompromisoFormato.create(compromisoFormato,{transaction: t}).then(compromisoF=>{
                            compromisosAdjs.forEach(function (adjuntoItem, i, array) {
                               adjuntoItem.materiaCompromisoId = materiaComp.get('id');
                            });
                            return CompromisoAdjMateria.bulkCreate(compromisosAdjs, {transaction: t})
                        })
                    }) 
                }).then(result => {
                    return res.created();
                }) .catch(err => {
                    return res.serverError(err)
                });

            }
        });
    },

    createWithFormat: function (req,res) {        
        let titulo = null;
        let descripcion = null;
        let porcentaje = null;
        let completaEquipo = false;
        let fechaEquipo = null;
        let adjunto = false;
        let completaTutor = false;
        let fechaTutor = null;
        let calificable = false;
        let materia_id = false;
        let semestre_id = false;
        let titulo_formato = null;
        let encabezado = null;
        let piePagina = null; 
        let tipoActa = null; 
        let fecha_creacion = null;
        let secciones = []; 
        let materiaCompromiso = null;
        let compromisoFormato = null;
        let cod= 0;
        let anexos = null;
        let formato = null;
        let compromisoAdj = null;
        let compromisosAdjs = [];
        
        titulo = req.param('titulo');    
        if (!titulo || titulo==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el titulo del compromiso'});
        }

        descripcion = req.param('descripcion');    
        if (!descripcion  || descripcion==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la descripcion del compromiso'});
        }

        porcentaje = req.param('porcentaje');    
        if (!porcentaje) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el porcentaje del compromiso'});
        }
        if(porcentaje=='null'){
         porcentaje=0;
        }

        materia_id = req.param('materia_id');    
        if (!materia_id ||  materia_id==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la materia para el compromiso'});
        }

        semestre_id = req.param('semestre_id');    
        if (!semestre_id ||  semestre_id==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el  semestre'});
        }
        
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
        
        if (!tipoActa ||  tipoActa==='null'||tipoActa==='undefined') {
            tipoActa= false;
        }
    
        fecha_creacion = req.param('fecha_creacion');
        if (!fecha_creacion||  fecha_creacion==='null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la fecha de creación'});
        }
    
        secciones = req.param('secciones');
        if (!secciones ||  secciones==='null') {
            return res.badRequest({code:1, msg: 'Se deben ingresar las secciones para el formato'});
        }else{secciones=JSON.parse(req.allParams().secciones);}

        completaEquipo = req.param('completaEquipo');
        if(!completaEquipo || completaEquipo=='null'){
            completaEquipo= false;
        } 

        fechaEquipo = req.param('fechaEquipo');
        if(!fechaEquipo || fechaEquipo == 'null'){
           fechaEquipo = '0000-00-00';
        }  

        adjunto = req.param('adjunto'); 
        if(!adjunto || adjunto == 'null'){
          adjunto= false;
        }

        completaTutor = req.param('completaTutor');
        if(!completaTutor || completaTutor== 'null'){
            completaTutor= false;
        } 

        fechaTutor = req.param('fechaTutor'); 
        if(!fechaTutor || fechaTutor== 'null'){
            fechaTutor = '0000-00-00';
        }
        calificable = req.param('calificable');
        if(!calificable || calificable== 'null'){
        calificable= false;
        } 
        

        formato = {
            titulo: titulo_formato,
            fechaCreacion: fecha_creacion,
            encabezado: encabezado,
            piePagina: piePagina,
            tipoActa: tipoActa,
            fechaCreacion: fecha_creacion
        }

        materiaCompromiso= {
            titulo:titulo,
            descripcion: descripcion,
            porcentaje: porcentaje,
            completaEquipo:completaEquipo,
            fechaEquipo:fechaEquipo,
            adjunto:adjunto,
            completaTutor:completaTutor,
            fechaTutor: fechaTutor,
            calificable:calificable,
            materiaCodigo:materia_id,
            semestreCodigo: semestre_id
        }

        compromisoFormato = {
            completaEquipo: completaEquipo,
            completaTutor: completaTutor
        }

        anexos= req.file('anexos');

        anexos.upload({
            noop: true,
            maxBytes: 250000000000,
            dirname: process.cwd() +  `/assets/formatos`,
            saveAs: function (__newFileStream, cb) {
                cb(null, `${titulo}_${materia_id}`+ cod++ + path.extname(__newFileStream.filename));
            }
        }, function (err, files) {
           if (err) {
              return res.serverError(err); 
            } 
           if (files.length === 0) {
                sequelize.transaction(function(t) {  
                    return Formato.create(formato, {transaction: t}).then(formato => {  
                        secciones.forEach(function (seccionItem, i, array) {
                            seccionItem.formatoId = formato.get('id');
                        }); 
                         compromisoFormato.formatoId= formato.get('id');
                        return Seccion.bulkCreate(secciones, {transaction: t}).then((secciones) => {
                            return formato.addSecciones(secciones, {transaction: t}).then(secciones =>{
                                return MateriaCompromiso.create(materiaCompromiso,{transaction: t}).then(materiaComp => {
                                    compromisoFormato.materiaCompromisoId = materiaComp.get('id');
                                    return CompromisoFormato.create(compromisoFormato,{transaction: t})
                                }) 
                            })
                        })
                    })      
                }).then(result => {
                    return res.created();
                }) .catch(err => {
                    return res.serverError(err)
                });
            }else{//Si hay archivos adjuntos

                files.forEach(function(file) {  
                    compromisoAdj = {
                        nombre: file.fd.substring(file.fd.lastIndexOf('/')+1),
                        uri: file.fd,
                        nombreReal: file.filename,
                        tipoArchivo: file.type
                
                        }
                    compromisosAdjs.push(compromisoAdj);
                });

                sequelize.transaction(function(t) {
                    return Formato.create(formato, {transaction: t}).then(formato => {  
                        secciones.forEach(function (seccionItem, i, array) {
                            seccionItem.formatoId = formato.get('id');
                        }); 
                         compromisoFormato.formatoId= formato.get('id');
                        return Seccion.bulkCreate(secciones, {transaction: t}).then((secciones) => {
                            return formato.addSecciones(secciones, {transaction: t}).then(secciones =>{  
                                return MateriaCompromiso.create(materiaCompromiso,{transaction: t}).then(materiaComp => {
                                    compromisoFormato.materiaCompromisoId = materiaComp.get('id');
                                    return CompromisoFormato.create(compromisoFormato,{transaction: t}).then(compromisoF=>{
                                        compromisosAdjs.forEach(function (adjuntoItem, i, array) {
                                             adjuntoItem.materiaCompromisoId = materiaComp.get('id');
                                        });
                                        return CompromisoAdjMateria.bulkCreate(compromisosAdjs, {transaction: t})
                                    })
                                })
                            })
                        })
                    }) 
                }).then(result => {
                    return res.created();
                }) .catch(err => {
                    return res.serverError(err)
                });

            }
        });
    }

};

