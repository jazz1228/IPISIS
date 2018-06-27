/**
 * BitacoraController
 *
 * @description :: Server-side logic for managing Bitacoras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const path = require('path');
const fs = require('fs');

module.exports = {
    //el id del proyecto, grupo y semestre deben ser enviados desde el front
	create: function(req, res){
        let fecha = null;
        let contenido = null;
        let compromisos = null;
        let dificultades = null;
        let bitacora = null;
        let proyecto_id = null;
        let anexos = null;
        let grupo = null;
        let semestre = null;
        let bitacoraAdjProyectos= [];
        let bitacoraAdj= null;
        let cod= 0;


        fecha = req.param('fecha');
        if (!fecha || fecha=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar la fecha'});
          }

        contenido = req.param('contenido');
        if (!contenido || contenido=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el contenido de la reunion'});
          }

        compromisos = req.param('compromisos');
        if (!compromisos || compromisos=== 'null') {
            compromisos= " ";
          }

        proyecto_id = req.param('proyecto_id');
        if (!proyecto_id || proyecto_id=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el codigo del proyecto'});
          }

        dificultades = req.param('dificultades');
        if (!dificultades || dificultades=== 'null') {
            dificultades= " ";
          }

        grupo = req.param('grupo');
        if (!grupo) {
            return res.badRequest({code:1, msg: 'Se debe ingresar el grupo'});
          }

        semestre = req.param('semestre');
          if (!semestre) {
              return res.badRequest({code:1, msg: 'Se debe ingresar el semestre'});
            }

        bitacora = {
            fecha: fecha,
            contenido_reunion: contenido,
            compromisos: compromisos,
            dificultades: dificultades,
        }

        anexos= req.file('anexos');

        anexos.upload({ // El input file debe llamarse anexos
            noop: true,
            maxBytes: 250000000000,
            dirname: process.cwd() +  `/assets/anexos/${semestre}/${grupo}`,
            saveAs: function (__newFileStream, cb) {
                cb(null, `${grupo}_Bitacora`+ cod++ +`_${fecha}`+ path.extname(__newFileStream.filename));
            }
        }, function (err, files) {
           if (err) {
              return res.serverError(err);
            }
           if (files.length === 0) {//Si la bitácora no tiene archivos adjuntos
            sequelize.transaction(function(t) {
                return Bitacora.create(bitacora, {transaction: t}).then(bitacora => {
                        return Proyecto.findOne({where: {id: proyecto_id}}, {transaction: t}).then(proyecto =>{
                            return proyecto.addBitacora(bitacora, {transaction: t})
                        })
                })
            }).then(result => {
                    return res.created();
                })
                .catch(err => {
                    return res.serverError(err)
            });
            }else{//Si hay archivos adjuntos

          files.forEach(function(file) {

            bitacoraAdj = {
                nombre: file.fd.substring(file.fd.lastIndexOf('/')+1),
                uri: file.fd,
                nombreReal: file.filename

                }
            bitacoraAdjProyectos.push(bitacoraAdj);
        });

        sequelize.transaction(function(t) {
           return Bitacora.create(bitacora, {transaction: t}).then(bitacora => {
                return Proyecto.findOne({where: {id: proyecto_id}}, {transaction: t}).then(proyecto =>{
                    return proyecto.addBitacora(bitacora, {transaction: t}).then(resBitacora => {

                        bitacoraAdjProyectos.forEach(function (bitacoraItem, i, array) {
                            bitacoraItem.bitacoraId = bitacora.get('id');
                          });
                        return BitacoraAdjProyecto.bulkCreate(bitacoraAdjProyectos, {transaction: t}).then((bitacoraAdjProyectos) => {
                            return bitacora.addBitacoraAdjProyecto(bitacoraAdjProyectos, {transaction: t})
                        })
                     })
                })
        })
        }).then(result => {
            return res.created();
        })
        .catch(err => {
            return res.serverError(err)
        });


            }
        });
    },

    getByProject: function(req, res){
            let proyecto_id = null;
            let archivos = [];
            let archivo = null;

            proyecto_id = req.param('proyecto_id');

            if (!proyecto_id) {
                return res.badRequest({code:1, msg: 'Se debe ingresar el codigo del proyecto'});
              }

            return Bitacora.findAll({
                include: [
                        {model: BitacoraAdjProyecto, as: 'bitacoraAdjProyecto'},
                        {   model: Proyecto,
                             as: 'proyecto',
                             where: {
                                id: proyecto_id
                             }
                         }
                        ]
              })
              .then(bitacoras => {
                return res.ok(bitacoras);
              })
              .catch(err => {
                return res.serverError(err);
              });

        },

     download: function(req, res) {
         var fileID = req.param('id') 
         
         BitacoraAdjProyecto.findById(fileID).then(file =>{
             if (!file) { return res.notFound() }
             res.download(file.uri, function (err) {
                if (err) {
                    return res.serverError(err)
                } else {
                    return res.ok()
                }
             })
         }).catch(err=>{
             return res.serverError(err)
         })     
     },

     //se requiere el id de la bitacora  y los datos para actualizar
    update: function(req,res){

            let bitacora_id= null;
            let fecha = null;
            let contenido = null;
            let compromisos =  null;
            let dificultades = null;
            let anexos = null;
            let bitacora_actual = null;
            let bitacoraAdj = null;
            let bitacoraAdjProyectos = [];
            let url= null;
            let grupo = null;
            let semestre = null;
            let cod= 0;
            let idFilesBitacora =[];
            let fileBitacorasDelete = [];
            let idFiles= null;

            bitacora_id= req.param("bitacora_id");
            if (!bitacora_id) {
                return res.badRequest({code:1, msg: 'Se debe ingresar el codigo de la bitácora'});
              }

            fecha= req.param("fecha");
            if (!fecha) {
                return res.badRequest({code:1, msg: 'Se debe ingresar la fecha'});
            }

            contenido= req.param("contenido");
           if (!contenido) {
                return res.badRequest({code:1, msg: 'Se debe ingresar el contenido de la reunion'});
            }

            compromisos= req.param("compromisos");
            if (!compromisos) {
               return res.badRequest({code:1, msg: 'Se deben ingresar los compromisos'});
            }

            dificultades= req.param("dificultades");
            if (!dificultades) {
                return res.badRequest({code:1, msg: 'Se deben ingresar las dificultades'});
            }

            grupo = req.param('grupo');
            if (!grupo) {
                return res.badRequest({code:1, msg: 'Se debe ingresar el grupo'});
            }

            semestre = req.param('semestre');
            if (!semestre) {
              return res.badRequest({code:1, msg: 'Se debe ingresar el semestre'});
            }

            idFiles= req.param('idFiles');
            if (!idFiles) {
              idFiles=[];
            }

            Bitacora.findAll({
                include: [
                    {model: BitacoraAdjProyecto, as: 'bitacoraAdjProyecto'}
                    ],
                where: {
                    id:bitacora_id
                }
            }).then(bitacora=>{

            anexos= req.file('anexos');
            url= process.cwd() +  `/assets/anexos/${semestre}/${grupo}`;

            BitacoraAdjProyecto.findAll({where: {bitacoraId:bitacora_id}}) //Se eliminan los archivos del servidor y su respectivo registo en la bd
            .then(AdjBitacoras => {
                AdjBitacoras.forEach(function(adj) {
                    idFilesBitacora.push(adj.id); //adjuntos que pertenecen a una bitacora
                });

            idFilesBitacora.forEach(function(file) {
                if (idFiles.indexOf(file) == -1) {
                    fileBitacorasDelete.push(file)
                }
            });
            
            BitacoraAdjProyecto.findAll({where: {id:{in: fileBitacorasDelete}}})
            .then(AdjBitacoras=>{
                AdjBitacoras.forEach(function (adj) {
                    fs.exists(adj.uri, (exists) => { //Verifica si los archivos de las bitacoras existen en la ruta
                        if(exists){
                            fs.unlink(adj.uri, function(err) { //Elimina los archivos de la bitacora
                                if (err) return res.serverError(err);
                            });
                        }
                    });
                })
                BitacoraAdjProyecto.destroy({where: {id: { in:fileBitacorasDelete}}}); //Elimina los registros de anexos de la bitacora
            });
            })
            .catch(err => {
                return res.serverError(err)
            });

            bitacora_actual = {
                fecha: fecha,
                contenido_reunion: contenido,
                compromisos: compromisos,
                dificultades:dificultades
            };

            anexos.upload({ // El input file debe llamarse anexos
                    noop: true,
                    maxBytes: 250000000000,
                    dirname: url,
                    saveAs: function (__newFileStream, cb) {
                        cb(null, `${grupo}_Bitacora`+ cod++ +`_${fecha}`+ path.extname(__newFileStream.filename));
                    }
                 }, function (err, files) {
                   if (err) {
                      return res.serverError(err);
                    }

                   if (files.length === 0) {//Si la bitácora no tiene archivos adjuntos
                        return Bitacora.update(bitacora_actual, {where: {id: bitacora_id}})
                        .then(resUpdate => {return res.ok();})
                        .catch(err => {return res.serverError(err);});
                   } else{//Si hay archivos adjuntos

                  files.forEach(function(file) {
                    bitacoraAdj = {
                        nombre: file.fd.substring(file.fd.lastIndexOf('/')+1),
                        uri: file.fd,
                        nombreReal: file.filename                  
                    }
                    bitacoraAdjProyectos.push(bitacoraAdj);
                });

                sequelize.transaction(function(t) {
                    return Bitacora.update(bitacora_actual, {where: {id: bitacora_id}},{transaction: t}).then(bitacora => {
                        bitacoraAdjProyectos.forEach(function (bitacoraItem, i, array) {
                            bitacoraItem.bitacoraId = bitacora_id;
                        });
                        return BitacoraAdjProyecto.bulkCreate(bitacoraAdjProyectos, {transaction: t}).then((bitacoraAdjProyectos) => {
                            return Bitacora.findOne({where: {id: bitacora_id}}, {transaction: t}).then(bitacora =>{
                                return bitacora.addBitacoraAdjProyecto(bitacoraAdjProyectos, {transaction: t});
                            })

                        })

                    });
                }).then(result => {
                    return res.created();
                }) .catch(err => {
                    return res.serverError(err)
                 });
                }
              });
             }).then(resBitacora => {
    		return res.ok();
    		})
    		.catch(err => {
    			if (err.code) {
    				return res.badRequest(err);
    			}
    			return res.serverError(err);
    		});
    },

    delete: function (req,res) {
            let bitacora_id = null;
            let fileBitacoraDelete = [];

            bitacora_id = req.param('bitacora_id');

    		if (!bitacora_id) {
    			return res.badRequest({code: 1, msg: 'Debe ingresar el código de la bitácora'});
            }

            BitacoraAdjProyecto.findAll({where: {bitacoraId:bitacora_id}}) //Se eliminan los archivos del servidor y su respectivo registo en la bd
            .then(AdjBitacoras => {
                AdjBitacoras.forEach(function(adj) {

                    fileBitacoraDelete.push(adj.id);
                    fs.exists(adj.uri, (exists) => { //Verifica si los archivos de las bitacoras existen en la ruta
                        if(exists){
                            fs.unlink(adj.uri, function(err) { //Elimina los archivos de la bitacora
                                if (err) return res.serverError(err);
                            });
                        }
                        });
                });
                BitacoraAdjProyecto.destroy({where: {id: { in: fileBitacoraDelete}}}); //Elimina los registros de anexos de la bitacora
            })
            .catch(err => {
                return res.serverError(err)
            });

            Bitacora.findOne({where:{id: bitacora_id}})
            .then(resBitacora =>{
                if(!resBitacora){
                    throw {code: 3, msg: 'La bitácora no existe'};
                }
            return Bitacora.destroy({where: {id: bitacora_id}});
            })
            .then(resBitacora => {
    			return res.ok();
    		})
    		.catch(err => {
    			if (err.code) {
    				return res.badRequest(err);
    			}
    			return res.serverError(err);
    		});
    }
};
