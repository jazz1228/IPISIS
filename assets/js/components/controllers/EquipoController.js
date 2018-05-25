angular.module('ipisis')
.controller('EquipoController', ['$scope', '$log', '$state', '$stateParams', '$ngConfirm', 'EquipoService', 'EstudianteService',
function ($scope, $log, $state, $stateParams, $ngConfirm, EquipoService, EstudianteService) {
  if (!$stateParams.equipo) {
    $state.go('equipos.lista');
    return '';
  } else {
    $scope.equipo = $stateParams.equipo;
  }

  $scope.usuario = {};
  $scope.cargarInformacion = function () {
    EquipoService.getEquipoInformacion({equipoCodigo: $scope.equipo.codigo})
    .then(function (res) {
      $scope.equipo = res.data;
    })
    .catch(function (err) {
      $log.log(err);
    });
  }
  $scope.cargarInformacion();

  $scope.addEstudiante = function () {
    EquipoService.addIntegrante({usuario: $scope.usuario.nombre, equipoCodigo: $scope.equipo.codigo})
    .then(function (res) {
      $scope.cargarInformacion()
    })
    .catch(function (err) {
      var data = err.data;
      if (data.code == 2) {
        $ngConfirm({
          title: 'Error',
          content: 'No se ha encontrado el equipo.',
          type: 'red',
          backgrounDismiss: true
        });
      }
      else if (data.code == 3) {
        $ngConfirm({
          title: 'Error',
          content: 'El estudiante ya ha sido invitado al equipo.',
          type: 'red',
          backgrounDismiss: true
        });
      }
      else if (data.code == 4) {
        $ngConfirm({
          title: 'Error',
          content: 'El equipo tiene una inscripción activa, por lo tanto no se pueden añadir estudiantes.',
          type: 'red',
          backgrounDismiss: true
        });
      }
      else if (data.code == 5) {
        $ngConfirm({
          title: 'Error',
          content: 'El estudiante no se ha encontrado.',
          type: 'red',
          backgrounDismiss: true
        });
      }
      else if (data.code == 6) {
        $ngConfirm({
          title: 'Error',
          content: 'No tiene permisos para añadir integrantes a este equipo.',
          type: 'red',
          backgrounDismiss: true
        });
      }
      else {
        $ngConfirm({
          title: 'Error',
          content: 'No se ha podido agregar al estudiante.',
          type: 'red',
          backgrounDismiss: true
        });
      }
    });
  }
}]);
