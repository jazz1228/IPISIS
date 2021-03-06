/**
 * ContenidoSeccionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    entregaActa: function (req, res) {
        let seccion_id = null;
        let equipo_id = null;
        let proyectoCompromiso_id = null;
        let usuario_id = null;
        let texto = null;
        let fechaTutor = null;
        let fechaEquipo = null;
        let esTutor = null;
        let estadosActa = [];
        let fechaCierreEquipo = null;
        let fechaCierreTutor = null;
        let params = {}
        let sinFirma = false;

        seccion_id = req.param('seccion_id');
        if (!seccion_id || seccion_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código de la seccion' });
        }
        equipo_id = req.param('equipo_id');
        if (!equipo_id || equipo_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código del equipo' });
        }
        proyectoCompromiso_id = req.param('proyectoCompromiso_id');
        if (!proyectoCompromiso_id || proyectoCompromiso_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código del compromiso' });
        }
        
        usuario_id= req.user.id;
        if (!usuario_id) {
            return res.forbidden();
        }
        texto = req.param('texto');
        if (!texto || texto == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el contenido de los términos y condiciones' });
        }
        fechaTutor = req.param('fechaTutor');
        fechaEquipo = req.param('fechaEquipo');

        esTutor = req.param('esTutor');
        if (!esTutor || esTutor == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar si el usuario es tutor' });
        }
        fechaCierreEquipo = req.param('fechaCierreEquipo');
        if (!fechaCierreEquipo || fechaCierreEquipo == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar la fecha límite de entrega para el equipo' });
        }
        fechaCierreTutor = req.param('fechaCierreTutor');
        if (!fechaCierreTutor || fechaCierreTutor == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar la fecha límite de entrega para el tutor' });
        }
        params = {
            esTutor: esTutor,
            equipo_id: equipo_id,
            usuario_id, usuario_id,
            proyectoCompromiso_id: proyectoCompromiso_id,
            texto: texto,
            seccion_id: seccion_id,
            fechaTutor: fechaTutor,
            fechaEquipo: fechaEquipo,
            fechaCierreEquipo: fechaCierreEquipo,
            fechaCierreTutor: fechaCierreTutor
        }

        if (params.esTutor === 'NO') { //verifica que sea estudiante
            if (new Date(fechaEquipo).getTime() <= new Date(fechaCierreEquipo).getTime() ) {//verificar como llega la fecha
                sequelize.transaction(t => {
                    return EquipoEstudiante.findAll({ where: { equipoCodigo: params.equipo_id } }).then(resEst => {     
                        if (resEst != 0) {//verifica que el equipo exista
                            resEst.forEach(est => {
                                let item = {
                                    estudiante: est.estudianteId,
                                    acta: est.estadoActa
                                }
                                estadosActa.push(item);//crea un arreglo con el id del estudiante y el estado del acta
                            });
                            let usrActa = this.usuarioActa(estadosActa, params.usuario_id);//obtiene el estado del acta del usuario que está firmando
                            if (usrActa.acta === 'SIN ENTREGA' || usrActa.acta === null) { //verifica que el usuario no haya firmado el acta
                                return EquipoEstudiante.update(
                                    { estadoActa: 'ENTREGADO' }, //actualiza el estado del acta para el usuario que la firma
                                    { where: { equipoCodigo: params.equipo_id, estudianteId: params.usuario_id } },
                                    { transaction: t }
                                ).then(resUpd => {
                                    return ProyectoCompromiso.update(
                                        { estado: 'PENDIENTE' },//actualiza el estado del compromiso
                                        { where: { id: params.proyectoCompromiso_id } },
                                        { transaction: t }
                                    ).then(resUpd => {
                                        //se crea o se actualiza el contenido de la seccion del acta
                                        let entregaFirma = {
                                            estado: 'PENDIENTE',
                                            proyectoCompromisoId: params.proyectoCompromiso_id,
                                            texto: params.texto,
                                            seccionId: params.seccion_id,
                                            nota: 0.0
                                        }
                                        return ContenidoSeccion.upsert(entregaFirma, { proyectoCompromisoId: params.proyectoCompromiso_id }, { transaction: t }).then(resUp => {
                                            return EquipoEstudiante.findAll({ where: { equipoCodigo: equipo_id } }).then(resEst => {
                                                if (resEst != 0) {//verifica que el equipo exista
                                                    resEst.forEach(est => {
                                                        if(est.estadoActa == 'SIN ENTREGA'){
                                                            sinFirma= true;
                                                        }
                                                    });
                                                }
                                                if (!sinFirma) {//se verifica si los demás integrantes del grupo ya firmaron el acta
                                                    return ContenidoSeccion.findOne({ where: { proyectoCompromisoId: params.proyectoCompromiso_id } }).then(resC => {
                                                        if (resC.fechaTutor != null) {//verifica si el tutor ya firmó el acta
                                                            return ContenidoSeccion.update(
                                                                {
                                                                    fechaEquipo: params.fechaEquipo,
                                                                    estado: 'ENTREGADO'//Actualiza la fecha del equipo y cambia el estado de entregado en el contenido de la seccion
                                                                },
                                                                { where: { proyectoCompromisoId: params.proyectoCompromiso_id } },
                                                                { transaction: t }
                                                            ).then(resUp => {
                                                                return ProyectoCompromiso.update(
                                                                    { estado: 'ENTREGADO' }, //actualiza el estado del compromiso
                                                                    { where: { id: params.proyectoCompromiso_id } },
                                                                    { transaction: t }
                                                                )
                                                            })
                                                        } else {//en caso de que el tutor no haya firmado
                                                            return ContenidoSeccion.update(
                                                                { fechaEquipo: params.fechaEquipo }, //actualiza la fecha del equipo
                                                                { where: { proyectoCompromisoId: params.proyectoCompromiso_id } },
                                                                { transaction: t })
                                                        }
                                                    })
                                                }
                                            })
                                        })
                                    })
                                });
                            } else {
                                return res.badRequest({ code: 1, msg: 'El usuario ya firmó el acta' });
                            }
    
                        } else {
                            return res.badRequest({ code: 1, msg: 'El equipo no existe' });
                        }
                    })

                }).then(result => {
                    return res.created();
                })
                .catch(err => {
                    return res.serverError(err)
                });
            }else{
                return res.badRequest({ code: 1, msg: 'La fecha límite para la firma del acta ya finalizó' });
            }
        } else {// en caso de que sea tutor
            if (new Date(fechaTutor).getTime() <= new Date(fechaCierreTutor).getTime() ) {//verificar como llega la fecha
                sequelize.transaction(t => {
                    return ProyectoCompromiso.findOne({ where: { id: params.proyectoCompromiso_id } }).then(resC => {
                        return Proyecto.findOne({ where: { id: resC.proyectoId } }).then(resP => {
                            return Inscripcion.findOne({ where: { id: resP.inscripcionId } }).then(resI => {
                                return Oferta.findOne({ where: { id: resI.ofertaId } }).then(resO => {
                                    if (params.usuario_id == resO.profesorId) {//verifica que el usuario sea el tutor del proyecto
                                        //se crea o se actualiza el contenido de la seccion del acta
                                        let entregaFirma = {
                                            fechaTutor: params.fechaTutor,
                                            estado: 'PENDIENTE',
                                            proyectoCompromisoId: params.proyectoCompromiso_id,
                                            texto: params.texto,
                                            seccionId: params.seccion_id,
                                            nota: 0.0
                                        }

                                        return ContenidoSeccion.upsert(entregaFirma, { proyectoCompromisoId: params.proyectoCompromiso_id }, { transaction: t }).then(resUpsert => {
				                            return ContenidoSeccion.findOne({where:{proyectoCompromisoId: params.proyectoCompromiso_id}}).then(resC => {                                              
                                                if (resC.fechaEquipo != null) {//verifica si el equipo ya firmó el acta
                                                    return ProyectoCompromiso.update(
                                                        { estado: 'ENTREGADO' }, //actualiza el estado del compromiso
                                                        { where: { id: params.proyectoCompromiso_id } },
                                                        { transaction: t }
                                                    ).then(resUp => {
                                                        return ContenidoSeccion.update(
                                                            {
                                                                fechaTutor: params.fechaTutor,//actualiza la fecha y el estado del contenido de la seccion
                                                                estado: 'ENTREGADO'
                                                            },
                                                            { where: { proyectoCompromisoId: params.proyectoCompromiso_id } },
                                                            { transaction: t }
                                                        )
                                                    })
                                                } else {//en caso de que el equipo no haya firmado
                                                    return ProyectoCompromiso.update(
                                                        { estado: 'PENDIENTE' },//se actualiza el estado del compromiso
                                                        { where: { id: params.proyectoCompromiso_id } },
                                                        { transaction: t })
                                                        .then(result => {
                                                            return res.created();
                                                        })
                                                        .catch(err => {
                                                            return res.serverError(err)
                                                        });
                                                }
                                           })
                                        })
                                    } else {
                                        return res.badRequest({ code: 1, msg: 'El usuario no es tutor de este proyecto' });
                                    }
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
            }else{
                return res.badRequest({ code: 1, msg: 'La fecha límite para la firma del acta ya finalizó' });
            }  
        }          
    },

    usuarioActa: function (obj, usr) {
        return obj.find(item => item.estudiante == usr);
    },
    
    getUserFirma: function (req, res) {
        let equipo_id = null;
        let tutor_id = null;
        let proyectoCompromiso_id = null;
        let usuariosConFirma = [];

        equipo_id = req.param('equipo_id');
        if (!equipo_id || equipo_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código del equipo' });
        }
        proyectoCompromiso_id = req.param('proyectoCompromiso_id');
        if (!proyectoCompromiso_id || proyectoCompromiso_id == 'null') {
            return res.badRequest({ code: 1, msg: 'Se debe ingresar el código del compromiso' });
        }

        return EquipoEstudiante.findAll({
            include: {model: Estudiante, as: 'estudiante'},     
            where: {equipoCodigo: equipo_id, estadoActa: 'SIN ENTREGA'}}).then(resEquipo =>{
                usuariosConFirma.push(resEquipo);
                return ContenidoSeccion.findOne({ where: { proyectoCompromisoId: proyectoCompromiso_id } }).then(resC => {
                   if(resC){
                    if (resC.fechaTutor === null) {
                        return Profesor.findOne({id: tutor_id}).then(resP =>{
                            usuariosConFirma.push(resP);
                        })
                    }
                   }
                }).then(result => {
                    return res.ok(usuariosConFirma);
                })
                .catch(err => {
                    return res.serverError(err)
                });
        })
    }       
};
