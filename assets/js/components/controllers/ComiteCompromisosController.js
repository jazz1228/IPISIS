var ipisis = angular.module('ipisis');
ipisis.controller('ComiteCompromisosController', ['$scope', '$state', '$log', '$ngConfirm', '$stateParams', 'SemestreService','InscripcionService','ProfesorService', 'ComiteService',
function($scope, $state, $log, $ngConfirm, $stateParams,SemestreService,InscripcionService ,ProfesorService, ComiteService) {
    $scope.files = [];
    $scope.filenames=[];
    $scope.filenamesViejo=[]
    $scope.filenamesNuevo=[]
    $scope.idFiles=[];
    let timestamp = null;
    let offset = null;
    let curso=null;
    let semestre=null;
    let titulo=null;
    let porcentaje=null;
    let descripcion=null;
    let checkEstudiante=null;
    let checkProfesor=null;
    let fechaEstudiante=null;
    let fechaProfesor=null;
    let requiresAttachment = false;
    let requiresGrade = false;
    let formato = false;
    

    $scope.null = function () {
      $state.go('comite.compromisos',{modo:'CREAR'});
    }

    cargarAsignaturas();
    cargarSemestres();
    cargarFormatos();

    function cargarAsignaturas(){
        ComiteService.obtenerAsignaturas()
        .success(function (data) {   
            $scope.asignaturas = data
        });
    } 
    
    function cargarSemestres() {
        ComiteService.getAllSemesters()
            .then(function (res) {
                $scope.semestres = res.data;
            })
            .catch(function (err) {
                $log.log(err);
            });
    }

    function cargarFormatos() {
      ComiteService.getAllFormats()
          .then(function (res) {
              $scope.formatos = res.data;
          })
          .catch(function (err) {
              $log.log(err);
          });
  }

    $scope.irFormato = function () {
      let control=0;
      if($scope.compromisos){
        if($scope.fecha.fechaEstudiante.fecha){
          offset = $scope.fecha.fechaEstudiante.fecha.getTimezoneOffset();
          timestamp = $scope.fecha.fechaEstudiante.fecha.getTime();
          var estudianteFecha = new Date(timestamp + (-offset * 60 * 1000));
          fechaEstudiante=estudianteFecha;
        }else{
          fechaEstudiante = new Date(0);
        }
        if($scope.fecha.fechaProfesor.fecha){
          offset = $scope.fecha.fechaProfesor.fecha.getTimezoneOffset();
          timestamp = $scope.fecha.fechaProfesor.fecha.getTime();
          var profesorFecha = new Date(timestamp + (-offset * 60 * 1000));
          fechaProfesor=profesorFecha;
        }else{
          fechaProfesor = new Date(0);
        }

        if($scope.compromisos.curso===undefined||$scope.compromisos.curso===null||$scope.compromisos.curso===''){
          control=1
        }else{curso=$scope.compromisos.curso;}
        if($scope.compromisos.semestre===undefined||$scope.compromisos.semestre===null||$scope.compromisos.semestre===''){
          control=2
        }else{semestre=$scope.compromisos.semestre;}
        if($scope.compromisos.titulo===undefined||$scope.compromisos.titulo===null||$scope.compromisos.titulo===''){
          control=3
        }else{titulo=$scope.compromisos.titulo;}
        if($scope.compromisos.porcentaje===undefined ||$scope.compromisos.porcentaje===null||$scope.compromisos.porcentaje===''){
          control=4
        }else{porcentaje=$scope.compromisos.porcentaje}
        if($scope.compromisos.descripcion===undefined||$scope.compromisos.descripcion===null||$scope.compromisos.descripcion===''){
          control=5
        }else{descripcion=$scope.compromisos.descripcion}
        if($scope.compromisos.checkEstudiante){
          checkEstudiante=$scope.compromisos.checkEstudiante;
        }else{
          checkEstudiante=false;
        }
        if($scope.compromisos.checkProfesor){
          checkProfesor=$scope.compromisos.checkProfesor;
        }else{
          checkProfesor=false;
        }
        if($scope.compromisos.requiresAttachment){
          requiresAttachment=$scope.compromisos.requiresAttachment;
        }else{
          requiresAttachment=false
        }
        if($scope.compromisos.requiresGrade){
          requiresGrade=$scope.compromisos.requiresGrade;
        }else{
          requiresGrade=false
        }
        
      }      
      if(control>0){
        $ngConfirm({
          content: 'Verifique todos los campos obligatorios',
          title: '',
          type: 'red',
          buttons: {
            Salir: {
              
            }
          }
        });
      }else{
        let comp ={
          fechaEquipo:fechaEstudiante,
          fechaTutor:fechaProfesor,
          materia_id:curso,
          semestre_id:semestre,
          titulo:titulo,
          porcentaje:porcentaje,
          descripcion:descripcion,
          completaEquipo:checkEstudiante,
          completaTutor:checkProfesor,
          adjunto:requiresAttachment,
          calificable:requiresGrade,
          anexos:$scope.files
        }        
        $state.go('configuraciones.formatos',{compromiso:comp, cambiaBoton:'Y'}); 
      }
    }

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
        fechaEstudiante: {
          fecha: new Date(),
          opened: false
        },
        fechaProfesor:{
          fecha: new Date(),
          opened: false
        }
      };
      $scope.compromisos = {
        curso: '',
        semestre: '',
        titulo: '',
        porcentaje: '',
        descripcion: '',
        checkEstudiante: '',
        requiresAttachment:'',
        checkProfesor:'',
        requiresGrade:'',
        formato:''
      };
    }else if ($stateParams.modo == 'ACTUALIZAR') {
      let compromiso = $stateParams.compromiso 
      $scope.fecha = {
        id: compromiso.id,
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
        fechaEstudiante: {
          fecha: new Date(fecha.fechaEstudiante),
          opened: false
        },
        fechaProfesor:{
          fecha: new Date(fecha.fechaProfesor),
          opened: false
        }
      };

      $scope.compromisos={
        titulo: compromiso.titulo,
        porcentaje: compromiso.porcentaje,
        descripcion: compromiso.descripcion,
        checkEstudiante: compromiso.completaEquipo,
        requiresAttachment: compromiso.adjunto,
        checkProfesor:compromiso.completaTutor,
        requiresGrade:compromiso.calificable,
        curso: compromiso.materia_id,
        semestre: compromiso.semestre_id,
        formato: compromiso.formato_id
      };
      let archivo=compromiso.compromisoAdjMateria;
      for(var i=0;i < archivo.length;i++){
        $scope.idFiles.push(archivo[i].id)
        $scope.filenamesViejo.push(archivo[i].nombreReal);
      }
    }

    $scope.open = function (item) {
      item.opened = !item.opened;
    }

    $scope.crearCompromiso = function () { //Crea el compromiso cuando se selecciona un formato que ya existe
      var data = new FormData();

      if($scope.compromisos){
        if($scope.fecha.fechaEstudiante.fecha){
          offset = $scope.fecha.fechaEstudiante.fecha.getTimezoneOffset();
          timestamp = $scope.fecha.fechaEstudiante.fecha.getTime();
          var estudianteFecha = new Date(timestamp + (-offset * 60 * 1000));
          fechaEstudiante=estudianteFecha;
        }else{
          fechaEstudiante = new Date(0);
        }
        if($scope.fecha.fechaProfesor.fecha){
          offset = $scope.fecha.fechaProfesor.fecha.getTimezoneOffset();
          timestamp = $scope.fecha.fechaProfesor.fecha.getTime();
          var profesorFecha = new Date(timestamp + (-offset * 60 * 1000));
          fechaProfesor=profesorFecha;
        }else{
          fechaProfesor = new Date(0);
        }
        if($scope.compromisos.curso){
          curso=$scope.compromisos.curso;
        }
        if($scope.compromisos.semestre){
          semestre=$scope.compromisos.semestre;
        }
        if($scope.compromisos.titulo){
          titulo=$scope.compromisos.titulo;
        }
        if($scope.compromisos.porcentaje){
          porcentaje=$scope.compromisos.porcentaje;
        }
        if($scope.compromisos.descripcion){
          descripcion=$scope.compromisos.descripcion;
        }
        if($scope.compromisos.checkEstudiante){
          checkEstudiante=$scope.compromisos.checkEstudiante;
        }
        if($scope.compromisos.checkProfesor){
          checkProfesor=$scope.compromisos.checkProfesor;
        }
        if($scope.compromisos.requiresAttachment){
          requiresAttachment=$scope.compromisos.requiresAttachment;
        }
        if($scope.compromisos.requiresGrade){
          requiresGrade=$scope.compromisos.requiresGrade;
        }
        if($scope.compromisos.formato){
          formato=$scope.compromisos.formato;
        }
      }

      data.append("titulo", titulo);
      data.append("descripcion", descripcion);
      data.append("porcentaje", porcentaje);
      data.append("completaEquipo", checkEstudiante);
      data.append("fechaEquipo", fechaEstudiante);
      data.append("adjunto", requiresAttachment);
      data.append("completaTutor", checkProfesor);
      data.append("fechaTutor", fechaProfesor);
      data.append("calificable", requiresGrade);
      data.append("materia_id", curso);
      data.append("semestre_id", semestre);
      data.append("formato_id", formato);
      
      for (var i in $scope.files) {
        data.append("anexos", $scope.files[i]);
      }
      crear(data);
    }

    function crear(data) {
      ComiteService.crearCompromiso(data) 
      .then(function (res) {
        $ngConfirm({
          content: 'El compromiso ha sido creado con exito.',
          title: '',
          type: 'green',
          buttons: {
            Salir: {
              action: function (button, scope) {
                $state.reload();
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
            content: 'El compromiso ha sido creado.',
            title: '',
            type: 'green',
            backgroundDismiss: true
          });
        }
        return ''; 
      });
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

}]);
