angular.module('ipisis')
  .controller('BitacoraController', ['$scope','$rootScope', '$log', '$state', '$stateParams', '$ngConfirm', 'EquipoService', 'EstudianteService','FileSaver', 'Blob',
    function ($scope,$rootScope, $log, $state, $stateParams, $ngConfirm, EquipoService, EstudianteService,FileSaver, Blob) {
      $scope.files = [];
      $scope.filenames=[];
      $scope.filenamesViejo=[]
      $scope.filenamesNuevo=[]
      $scope.idFiles=[];
     
      $scope.null = function () {
        $state.go('equipo.crearBitacora')
      };
      if ($stateParams.modo == 'CREAR') {
        $scope.fecha = {
          codigo: null,
          format: 'yyyy/MM/dd',
          modo: 'CREAR',
          opcionesFecha: {
            dateDisabled: false,
            formatYear: 'yyyy',
            startingDay: 1
          },
          opcionesTiempo: {
            hstep: 1,
            mstep: 1,
            ismeridian: true
          },
          bitacoraFecha: {
            fecha: new Date(),
            opened: false
          },
        };
        $scope.bitacora={
          contenido:'',
          compromisos:'',
          dificultades:'',
          anexos:null
        };
      }
      else if ($stateParams.modo == 'ACTUALIZAR') {
        var bitacora = $stateParams.bitacora
        $scope.fecha = {
          id:bitacora.id,
          codigo: null,
          format: 'yyyy/MM/dd',
          modo: 'ACTUALIZAR',
          opcionesFecha: {
            dateDisabled: false,
            formatYear: 'yyyy',
            startingDay: 1
          },
          opcionesTiempo: {
            hstep: 1,
            mstep: 1,
            ismeridian: true
          },
          bitacoraFecha: {
            fecha: new Date(bitacora.fecha),
            opened: false
          },
        };

        $scope.bitacora={
          id:bitacora.id,
          contenido:bitacora.contenido_reunion,
          compromisos:bitacora.compromisos,
          dificultades:bitacora.dificultades
        };
        let archivo=bitacora.bitacoraAdjProyecto
        for(var i=0;i < archivo.length;i++){
          $scope.idFiles.push(archivo[i].id)
          $scope.filenamesViejo.push(archivo[i].nombreReal);
        }
      }

      $scope.open = function (item) {
        item.opened = !item.opened;
      }

      $scope.crearBitacora = function () {
        var timestamp = null;
        var offset = null;
        let equipo=null;
        if($stateParams.profesor==='OK'){
          equipo=$stateParams.proyecto.inscripcion
        }else{
          equipo=$stateParams.equipo.inscripcion
        }
        let contenido=null;
        let compromisos=null;
        let dificultades=null;
        let anexos=null;
        let fecha=null;
        let fechaBitacora =null;
        let data=null;

        if($scope.bitacora){
          if($scope.fecha.bitacoraFecha.fecha){
            offset = $scope.fecha.bitacoraFecha.fecha.getTimezoneOffset();
            timestamp = $scope.fecha.bitacoraFecha.fecha.getTime();
            fechaBitacora = new Date(timestamp + (-offset * 60 * 1000));
            data = new FormData();
            fecha=fechaBitacora;
          }
          if($scope.bitacora.contenido){
            contenido=$scope.bitacora.contenido;
          }
          if($scope.bitacora.compromisos) {
            compromisos=$scope.bitacora.compromisos;
          }
          if($scope.bitacora.dificultades){
            dificultades=$scope.bitacora.dificultades;
          }
          if($scope.files){
            anexos=data;
          }
        }

        if(data===null){
          $ngConfirm({
            content: 'Por favor complete los campos obligatorios',
            title: 'Error',
            type: 'red',
            backgroundDismiss: true
          });
        }else{
          data.append("fecha",fecha);
          data.append("contenido",contenido);
          data.append("compromisos",compromisos);
          data.append("dificultades",dificultades);
          data.append("idFiles", $scope.idFiles)
          if($stateParams.profesor==='OK'){
            data.append("proyecto_id",$stateParams.proyecto.id);
            data.append("semestre",$stateParams.proyecto.inscripcion.oferta.semestreCodigo);
            data.append("grupo",$stateParams.proyecto.grupoMares);
          }else{

            data.append("proyecto_id",equipo.proyecto.id);
            data.append("semestre",equipo.oferta.semestreCodigo);
            data.append("grupo",equipo.proyecto.grupoMares);
          }

          if ($scope.fecha.modo == 'ACTUALIZAR') {
            data.append("bitacora_id",$stateParams.bitacora.id);
          }
          for (var i in $scope.files) {
            data.append("anexos", $scope.files[i]);
          }
          if ($scope.fecha.modo == 'ACTUALIZAR') {
            actualizar(data);
          }
          else if ($scope.fecha.modo == 'CREAR') {
            crear(data);
          }
        }
      }

      function crear(data) {
        EstudianteService.crearBitacora(data)
        .then(function (res) {
          $ngConfirm({
            content: 'La bitácora ha sido creada con éxito',
            title: '',
            type: 'green',
            buttons: {
              Salir: {
                action: function (button, scope) {
                  if($stateParams.profesor==='OK'){
                    $state.go('profesor-listar-bitacora',{equipo:$stateParams.equipo,proyecto:$stateParams.proyecto})
                  }else{
                    $state.go('equipo.listar-bitacora',{equipo:$stateParams.equipo})
                  }
                }
              }
            }
          });
        })
        .catch(function (err) {
          $log.log(err);  
          if (err.data.code) {
            if (err.data.code == 1) {
              $ngConfirm({
                content: err.data.msg,
                title: 'Error',
                type: 'red',
                backgroundDismiss: true
              });
            }
          } else {
            $ngConfirm({
              content: 'La bitácora ha sido creada',
              title: '',
              type: 'green',
              backgroundDismiss: true
            });
          }
          return '';
        });
      }

      function actualizar(data) {
        EstudianteService.actualizarBitacora(data)
        .then(function (res) {
          $ngConfirm({
            content: 'La bitácora ha sido actualizada.',
            title: '',
            type: 'green',
            buttons: {
              Aceptar: {
                action: function (button, scope) { 
                    if($stateParams.profesor==='OK'){
                      $state.go('crearBitacoraP', {bitacora: $stateParams.bitacora,proyecto:$stateParams.proyecto ,profesor:'OK',modo: 'ACTUALIZAR'});
                    }else{
                      $state.go('equipo.crearBitacora', {bitacora: $stateParams.bitacora, modo: 'ACTUALIZAR'});
                  }
                }
              }
            }
          });
        })
        .catch(function (err) {
          $log.log(err);
          if (err.data.code) {
            if (err.data.code == 1) {
              $ngConfirm({
                content: err.data.msg,
                title: 'Error',
                type: 'red',
                backgroundDismiss: true
              });
            }
          } else {
            $ngConfirm({
              content: 'La bitácora ha sido actualizada',
              title: '',
              type: 'green',
              backgroundDismiss: true
            });
          }
          return '';
        });
      }

       $scope.salir=function(){
          if($stateParams.profesor==='OK'){
              $state.go('profesor-listar-bitacora',{equipo:$stateParams.equipo,proyecto:$stateParams.proyecto})
          }else{
              $state.go('equipo.listar-bitacora',{equipo:$stateParams.equipo})
          }
            
      }

      $scope.getFileDetails = function (e) {
        $scope.$apply(function () {
          for (var i = 0; i < e.files.length; i++) {
            $scope.files.push(e.files[i]);
            $scope.filenamesNuevo.push(e.files[i].name);

          }
          $scope.filenames =   $scope.filenamesViejo.concat($scope.filenamesNuevo)
        });
      };
      $scope.eliminarAnexo = function(anexo){
        let eliminaNuevo=$scope.filenamesNuevo.indexOf(anexo);
        let eliminaViejo=$scope.filenamesViejo.indexOf(anexo);
        if(eliminaNuevo > -1){
          $scope.files.splice(eliminaNuevo, 1);
          $scope.filenamesNuevo.splice(eliminaNuevo, 1);
        }
        if(eliminaViejo > -1){
          $scope.filenamesViejo.splice(eliminaViejo, 1);
          $scope.idFiles.splice(eliminaViejo, 1);
        }
        $scope.filenames = $scope.filenamesViejo.concat($scope.filenamesNuevo)
      };
      $scope.cargarPagina = function () {
        $state.reload();
      }
  
      $scope.classValidacion = function (formToVal, nombre) {
        var form = formToVal;
        if (form[nombre].$invalid && (!form.$pristine || form.$submitted || form[nombre].$touched)) {
          return ['has-error'];
        }
        else if (form[nombre].$valid) {
          return ['has-success'];
        }
      }
    
      $scope.inputValidacion = function (formToVal, nombre) {
        var form = formToVal;
        return form[nombre].$error
      }
  
      $scope.mostrarValidacion = function (formToVal, nombre) {
        var form = formToVal;
        return form[nombre].$touched || form.$submitted
      }

      $scope.ids= $scope.idFiles
      $scope.filenames =   $scope.filenamesViejo

    }
  ]);
