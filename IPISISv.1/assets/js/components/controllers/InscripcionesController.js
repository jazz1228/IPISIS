angular.module('ipisis')
.controller('InscripcionesController', ['$scope','$ngConfirm', 'InscripcionService',
function ($scope, $ngConfirm, InscripcionService ) {

    InscripcionService.getInscripcionesEquipo({equipoCodigo: $scope.equipo.codigo})
      .success(function (resultado) {
        $scope.inscripciones = resultado;
      })
      .error(function (err) {
        //console.log(err);
      })

		$scope.seleccionar = function (oferta) {
			$scope.ofertaSeleccionada = oferta;
      $ngConfirm({
        title: '',
        contentUrl: 'templates/private/equipo/detalleInscripcion.html',
        backgroundDismiss: true,
        columnClass: 'l',
        scope: $scope,
        buttons: {
          Salir: {
            btnClass: 'btn-default',
            action: function (scope, button) {
              $scope.error = false;
              return true;
            }
          },
          Inscribir: {
            btnClass: 'btn-success',
            action: function (scope, button) {
              var credenciales = {
                equipoCodigo: 1,
                ofertaId: $scope.ofertaSeleccionada.id,
                asignaturaCodigo: $scope.asignatura
              };
              InscripcionService.inscribir(credenciales)
                .success(function (resultado) {
                  $ngConfirm('Inscripción existosa.');
                })
                .error(function (err) {
                  $ngConfirm('La inscripcion no ha podido se completada.');
                  //console.log(err);
                });
            }
          },
        }
      });
		}
}]);
