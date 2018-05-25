angular.module('ipisis')
.controller('InscripcionController', ['$scope','$ngConfirm', 'OfertaService', 'InscripcionService', 'SemestreService',
function ($scope, $ngConfirm, OfertaService, InscripcionService, SemestreService ) {
  var semestreActual = null;
  $scope.inscripcion = {
    asignatura: 0
  };

  SemestreService.getSemestreActual()
  .then(function (res) {
    semestreActual = res.data;
    return OfertaService.getAllBySemestre({semestreCodigo: semestreActual.codigo});
  })
  .then(function (res) {
    $scope.ofertas = res.data;
  })
  .catch(function (err) {
    $log.log(err);
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
              equipoCodigo: $scope.equipo.codigo,
              ofertaId: $scope.ofertaSeleccionada.id,
              materiaCodigo: $scope.materia
            };
            InscripcionService.inscribir(credenciales)
            .success(function (resultado) {
              OfertaService.getAllBySemestre({semestreCodigo: semestreActual.codigo})
              .success(function(resultado) {
                $scope.ofertas = resultado;
              }).
              error(function (err) {
                //console.log(err);
              });
              $ngConfirm({
                title: '',
                content: 'La inscripción ha sido exitosa.',
                type: 'green',
                backgrounDismiss: true
              });
            })
            .error(function (err) {
              if (err.code) {
                code = err.code;
                if (code == 1) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'La inscripción no ha sido completada',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 2) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'La inscripción ha sido prohibida.',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 3) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'El equipo no cumple con la cantidad de miembros requerida.',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 4) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'El equipo ya tiene una inscripción activa en esta idea.',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 5) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'El equipo ya está matriculado en una oferta.',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 6) {
                  $ngConfirm({
                    title: 'Error',
                    content: 'El equipo ha alcanzado la cantidad maxima de inscripciones activas.',
                    type: 'red',
                    backgrounDismiss: true
                  });
                } else if (code == 7) {
                  $scope.estudiantes = err.estudiantes;
                  $ngConfirm({
                    title: 'Error',
                    content: '<p>Los siguientes estudiantes ya están inscritos \
                    en la cantidad máxima de inscripciones \
                    o ya están matriculados en una oferta para la asignatura seleccionada.<p> \
                    <p ng-repeat="est in estudiantes"><b>{{estudiante.nombre}}<b/></p>',
                    backgroundDismiss: true,
                    scope: $scope,
                    buttons: {
                      Salir: {
                        btnClass: 'btn-default',
                        action: function (scope, buttons) {
                        }
                      }
                    }
                  });
                } else if (code == 8) {
                  $scope.estudiante = err.estudiante;
                  $ngConfirm({
                    title: 'Error',
                    content: '<p>El siguiente estudiante no cumple con la cantidad mínima de creditos aprobados: <b>{{estudiante.nombre}}</b></p>',
                    type: 'red',
                    backgroundDismiss: true,
                    scope: $scope
                  });
                } else if (code == 9) {
                  $scope.estudiante = err.estudiante;
                  $ngConfirm({
                    title: 'Error',
                    content: '<p>El siguiente estudiante no cumple los prerrequisitos de la oferta: <b>{{estudiante.nombre}}</b></p>',
                    type: 'red',
                    backgroundDismiss: true,
                    scope: $scope
                  });
                } else if (code == 10) {
                  $ngConfirm({
                    title: 'Error',
                    content: '<p>Todos los integrantes deben aceptar la invitación antes de inscribir una oferta.</p>',
                    type: 'red',
                    backgroundDismiss: true,
                    scope: $scope
                  });
                }
                else if (code == 11) {
                  $ngConfirm({
                    title: 'Error',
                    content: '<p>La inscripción a la oferta aún no está activa, verifique el calendario de inscripciones.</p>',
                    type: 'red',
                    backgroundDismiss: true,
                    scope: $scope
                  });
                } else {
                  $ngConfirm({
                    title: 'Error',
                    content: 'Ha ocurrido un error interno, por favor intentelo más tarde',
                    type: 'red',
                    backgrounDismiss: true
                  });
                }
              }
            });
          }
        },
      }
    });
  }
}]);
