angular.module('ipisis')
.controller('CrearEquipoController', ['$scope', '$log', '$state', '$ngConfirm', 'EquipoService', 'EstudianteService',
function ($scope, $log, $state, $ngConfirm, EquipoService, EstudianteService) {
  var estudianteActual = null;
  $scope.estudiantes = []


  EstudianteService.getEstudianteSession()
  .then(function (res) {
    estudianteActual = res.data;
    $scope.estudiantes.push(estudianteActual);
  })
  .catch(function (err) {
    $log.log(err);
  });

  $scope.addEstudiante = function () {
    for (var i in $scope.estudiantes) {
      if ($scope.estudiantes[i].nombreUsuario == $scope.usuarioMares) {
        $ngConfirm({content: 'El estudiante ya ha sido añadido.', title: '', type: 'red', backgroundDismiss: true});
        return;
      }
    }

    EstudianteService.getEstudiante({usuario: $scope.usuarioMares})
    .then(function (res) {
      $scope.estudiantes.push(res.data);
    })
    .catch(function (err) {
      $ngConfirm({content: 'El estudiante no se ha encontrado.', title: '', type: 'red', backgroundDismiss: true});
      $log.log(err);
    });
  }

  $scope.eliminarEstudiante = function (estudiante) {
    if (estudiante === estudianteActual) {
      return;
    }
    $scope.estudiantes.splice($scope.estudiantes.indexOf(estudiante), 1);
  }

  $scope.crearEquipo = function () {
    var equipo = null;
    var estudiantesId = [];
    angular.forEach($scope.estudiantes, function (estudiante, i) {
      estudiantesId.push(estudiante.id);
    });

    equipo = {
      nombre: $scope.nombreEquipo,
      estudiantesId: estudiantesId
    }

    EquipoService.crear(equipo)
    .then(function (res) {
      $ngConfirm({
        title: 'Equipo creado',
        content: 'El equipo ha sido creado.',
        columnClass: 's',
        type: 'green',
        buttons: {
          Salir: {
            btnClass: 'btn-green',
            action: function (scope, button) {
              $state.go('equipos.lista');
            }
          }
        }
      });
    })
    .catch(function (err) {
      $ngConfirm({content: 'El equipo no ha sido creado.', title: 'Error', type: 'red', backgroundDismiss: true});
      $log.log(err);
    });
  }
}]);
