angular.module('ipisis')
  .controller('CompromisosEquipoController', ['$scope','$rootScope', '$log', '$state', '$stateParams', '$ngConfirm','EquipoService','SemestreService',
    function ($scope,$rootScope, $log, $state, $stateParams, $ngConfirm,EquipoService,SemestreService) {

    obtenerCompromisos();
    profesor();
    function profesor(){
        if($stateParams.profesor=='OK'){
            $scope.profesor='YES';
        }
        else{
            $scope.profesor='NO';
        }
    } 

    let infoCompromiso;
    $scope.aceptarTerminos=function(terminos){       
        let seccion_id=$scope.seccionActa.id;
        let equipo_id=$stateParams.equipo.codigo;
        let proyectoCompromiso_id = infoCompromiso.id;
        let fechaCierreEquipo=infoCompromiso.fechaEquipo;
        let fechaCierreTutor=infoCompromiso.fechaTutor;
        let texto=$scope.seccionActa.guia;
        let fechaTutor;
        let fechaEquipo;
        let esTutor;
        let tutor_id=$stateParams.equipo.inscripcion.oferta.profesor.id;
        
        if(terminos){
            if($scope.profesor=='YES'){
                fechaTutor=new Date();
                esTutor='YES';
                texto='Yo como tutor me comprometo a cumplir con los compromisos de Proyecto Integrador.'
            }
            else{
                fechaEquipo=new Date();
                esTutor='NO';
            }
            let datos={
                seccion_id:seccion_id,
                equipo_id:equipo_id,
                proyectoCompromiso_id:proyectoCompromiso_id,
                fechaCierreEquipo:fechaCierreEquipo,
                fechaCierreTutor:fechaCierreTutor,
                texto:texto,
                fechaTutor:fechaTutor,
                fechaEquipo:fechaEquipo,
                esTutor:esTutor
            }
            $ngConfirm({
                title: '',
                content: '¿Está seguro que desea firmar el acta de compromiso?',
                backgroundDismiss: true,
                type: 'green',
                columnClass: 's',
                scope: $scope,
                buttons: {
                  Aceptar: {
                    btnClass: 'btn-default',
                    action: function (scope, button) {
                        let parametros={
                            equipo_id:equipo_id,
                            tutor_id:tutor_id,
                            proyectoCompromiso_id:proyectoCompromiso_id
                        }
                        EquipoService.getUsuariosSinFirma(parametros)
                        .then(function(res){
                            let estudiantes=res.data[0]
                            let profesor=res.data[1]
                            let cadena ='';
                            if(estudiantes.length==0){
                                cadena=cadena+"Todos los estudiantes han firmado el acta"
                            }
                            else{
                                cadena=cadena+"El o los estudiantes: "
                                estudiantes.forEach(estudiante => {
                                    cadena=cadena+estudiante.estudiante.nombre.toUpperCase();
                                    cadena=cadena+", "
                                });
                                cadena=cadena+" no han firmado el acta de compromiso"
                            }
                            if(profesor){
                                cadena=cadena+", y el profesor "+profesor.nombre+" no ha firmado."
                                
                            }
                            else{
                                cadena=cadena+", y el tutor ya ha firmado el acta."
                            }
                            EquipoService.firmarActa(datos)
                            .then(function(res){
                                $ngConfirm({
                                    title: '',
                                    content: 'El acta ha sido firmada.<br>'+cadena,
                                    backgroundDismiss: true,
                                    type: 'green',
                                    columnClass: 's',
                                    scope: $scope,
                                    buttons: {
                                    Aceptar: {}
                                    }
                                });
                                $state.reload();
                            })
                            .catch(function (err) {
                                let error=err.data
                                if(error){
                                    if(error.msg){
                                        $ngConfirm({
                                            title: '',
                                            content: 'Usted ya ha firmado el acta de compromiso anteriormente.<br>'+cadena,
                                            backgroundDismiss: true,
                                            type: 'red',
                                            columnClass: 's',
                                            scope: $scope,
                                            buttons: {
                                            Aceptar: {}
                                            }
                                        });
                                        $state.reload();
                                    }
                                }
                                else{
                                    $log.log(err);
                                }
                            })
                        });
                    }
                  },
                  Cancelar:{}
                }
              });
        }
    }
    $scope.seleccionarCompromiso= function(compromiso){
        $scope.acta=compromiso.materiaCompromiso.formatos[0].tipoActa;
        $scope.noActa= !$scope.acta;
        $scope.seccionActa=compromiso.materiaCompromiso.formatos[0].secciones[0];
        infoCompromiso=compromiso;

        if($scope.acta){
            generarActa($stateParams.equipo, compromiso);
        }else{
            //Acá viene cuando el compromiso no es un acta
            $scope.encabezado=compromiso.materiaCompromiso.formatos[0].encabezado;
            $scope.piePagina=compromiso.materiaCompromiso.formatos[0].piePagina;
            $scope.numSeccionesCompromiso=compromiso.materiaCompromiso.formatos[0].secciones.length;
            $scope.seccionesCompromiso=compromiso.materiaCompromiso.formatos[0].secciones;            
        }

    }
    function obtenerCompromisos() {
        let semestre=$stateParams.equipo.inscripcion.oferta.semestreCodigo;
        let proyecto=$stateParams.equipo.inscripcion.proyecto.id;
        EquipoService.getCompromisos({proyecto_id:proyecto,semestre_id:semestre})
        .success(function(resultado){
            $scope.compromisos=resultado;
        })
    }
    generarActa = function (equipo,compromiso) {
        $scope.tituloProyecto= equipo.inscripcion.proyecto.nombre;
        $scope.tutorProyecto= equipo.inscripcion.oferta.profesor.nombre;
        $scope.estudiantes= equipo.estudiantes;
        $scope.codigo= equipo.inscripcion.materia.codigo;
        $scope.asignatura= equipo.inscripcion.materia.nombre;
        $scope.encabezado=compromiso.materiaCompromiso.formatos[0].encabezado;
        $scope.piePagina=compromiso.materiaCompromiso.formatos[0].piePagina;
        $scope.estadoActa=compromiso.estado;
        let group = equipo.inscripcion.proyecto.grupoMares.split("-");
        $scope.grupo= group.pop();
        SemestreService.getSemestreActual()
        .success(function (resultado) {
            $scope.semestre= resultado.codigo;
        })
    }
    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; 
    let yyyy = today.getFullYear();
    if(dd<10) {
        dd='0'+dd;
    } 
    
    if(mm<10) {
        mm='0'+mm;
    } 
    $scope.fechaActual= dd+'/'+mm+'/'+yyyy;

}]);
