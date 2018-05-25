angular.module('ipisis')
.controller('ListaEquiposController', ['$scope', '$log', '$state', '$stateParams', '$ngConfirm', 'EquipoService', 'EstudianteService',
function ($scope, $log, $state, $stateParams, $ngConfirm, EquipoService, EstudianteService) {
  cargarInformacion();

  $scope.seleccionarEquipo = function (equipo) {
    if (equipo.EquipoEstudiante.estadoInvitacion  == 'PENDIENTE') {
      $ngConfirm({content: 'Debe aceptar la invitacion primero.', title: '', type: 'red', backgroundDismiss: true});
      return;
    }

    $state.go('equipo', {equipo: equipo})
  }

  $scope.salirEquipo = function (equipo) {
    $ngConfirm({
      title: '',
      content: '¿Está seguro que desea salir del equipo?',
      backgroundDismiss: true,
      type: 'red',
      columnClass: 's',
      scope: $scope,
      buttons: {
        Salir: {
          btnClass: 'btn-default',
          action: function (scope, button) {
            return true;
          }
        },
        Aceptar: {
          btnClass: 'btn-danger',
          action: function (scope, button) {
            salirEquipo(equipo);
          }
        }
      }
    });
  }

  $scope.procesarInvitacion = function (equipo, accion) {
    $ngConfirm({
      title: '',
      content: '¿Está seguro que desea <b>' + (accion == 1 ? 'aceptar':'rechazar') + '</b> la invitacion?',
      backgroundDismiss: true,
      type: 'red',
      columnClass: 's',
      scope: $scope,
      buttons: {
        Salir: {
          btnClass: 'btn-default',
          action: function (scope, button) {
            return true;
          }
        },
        Aceptar: {
          btnClass: 'btn-danger',
          action: function (scope, button) {
            procesarInvitacion(equipo, accion);
          }
        }
      }
    });

  }

  $scope.mostrarInvitacion = function (equipo) {
    return equipo.EquipoEstudiante.estadoInvitacion  == 'PENDIENTE';
  }

  $scope.mostrarSalir = function (equipo) {
    return equipo.EquipoEstudiante.estadoInvitacion  == 'ACEPTADA';
  }


  function cargarInformacion () {
    EquipoService.getEquiposSession()
    .then(function (res) {
      $scope.equipos = res.data.equipos;
    })
    .catch(function (err) {
      $log.log(err);
    });
  }

  function salirEquipo(equipo) {
    EquipoService.salir({equipoCodigo: equipo.codigo})
    .then(function (res) {
      $scope.equipos.splice($scope.equipos.indexOf(equipo), 1);
    })
    .catch(function (err) {
      //console.log(err);
    });
  }

  function procesarInvitacion(equipo, accion) {
        credenciales = {
          equipoCodigo: equipo.codigo,
          accion: accion
        }

        EquipoService.procesarInvitacion(credenciales)
        .then(function (res) {
          if (accion == 1) {
            equipo.EquipoEstudiante.estadoInvitacion = 'ACEPTADA';
          } else if (accion == 2) {
            $scope.equipos.splice($scope.equipos.indexOf(equipo), 1)
          }
        })
        .catch(function (err) {
          $log.log(err)
        });
  }
}]);
