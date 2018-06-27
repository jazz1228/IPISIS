var ipisis = angular.module('ipisis');
ipisis.controller('listaProyectosController', ['$scope', '$state', '$ngConfirm',  '$stateParams', 'SemestreService','InscripcionService','ProfesorService',
function($scope, $state, $ngConfirm, $stateParams,SemestreService,InscripcionService ,ProfesorService) {
  cargarProyectos();

  function cargarProyectos() {
    SemestreService.getSemestreActual()
    .then(function (res) {
      semestre_codigo = {semestre_codigo:res.data.codigo};
      ProfesorService.getProyect(semestre_codigo)
      .success(function(resultado) {
      $scope.Proyectos = resultado;
      });
    })
    .catch(function (err) {
      $log.log(err);
    })
  }
  $scope.seleccionarProyecto = function(proyecto){
    let project = {proyecto_id:proyecto.id}
      ProfesorService.getEquipo(project)
      .success(function(resultado) {
      $state.go('proyecto', {equipo: resultado[0],proyecto:proyecto});
      });
  }
}]);
