angular.module('ipisis')
.controller('ListaSemestreController', ['$scope', '$log', '$ngConfirm', '$state', 'SemestreService',
function ($scope, $log, $ngConfirm, $state, SemestreService) {
  cargarSemestres();


  $scope.eliminar = function (semestre) {
    $ngConfirm({
      content: '¿Está seguro que desea eliminar el semestre?',
      title: 'Alerta!',
      type: 'orange',
      backgroundDismiss: true,
      buttons: {
        Salir: {
          action: function (button, scope) {
            return true;
          }
        },
        Aceptar: {
          btnClass: 'btn-success',
          action: function (button, scope) {
            SemestreService.eliminar({codigo: semestre.codigo})
            .then(function (res) {
              $scope.semestres.splice($scope.semestres.indexOf(semestre), 1);
            })
            .catch(function (err) {
              if (err.data) {
                if (err.data.code == 2) {
                  $ngConfirm({
                    content: 'El semestre no puede ser eliminado.',
                    title: 'Error',
                    type: 'red',
                    backgroundDismiss: true
                  });
                  return '';
                }
              }
              $ngConfirm({
                content: 'El semestre no se ha podido eliminar, intentelo nuevamente.',
                title: 'Error',
                type: 'red',
                backgroundDismiss: true
              });
              return '';
            });          }
          }
        }
      });
      return '';
<<<<<<< HEAD
=======


>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
    }

    $scope.actualizar = function (semestre) {
      $state.go('semestres.crear', {semestre: semestre, modo: 'ACTUALIZAR'});
    }

    function cargarSemestres() {
      SemestreService.getAll()
      .then(function (res) {
        $scope.semestres = res.data;
      })
      .catch(function (err) {
        $log.log(err);
      });
    }
  }]);
