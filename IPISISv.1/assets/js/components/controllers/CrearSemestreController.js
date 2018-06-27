angular.module('ipisis')
.controller('CrearSemestreController', ['$scope', '$log', '$ngConfirm', '$state', '$stateParams', 'SemestreService',
function ($scope, $log, $ngConfirm, $state, $stateParams, SemestreService) {
  if ($stateParams.modo == 'CREAR') {
    $scope.semestre = {
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
      semestreFechas: [
        {nombre: 'Inicio semestre', fecha: new Date(), opened: false},
        {nombre: 'Cierre semestre', fecha: new Date(), opened: false}
      ],
      inscripcionFechas: [
        {nombre: 'Inicio inscripcion', fecha: new Date(), opened: false},
        {nombre: 'Cierre inscripcion', fecha: new Date(), opened: false}
      ]
    };
  }
  else if ($stateParams.modo == 'ACTUALIZAR') {
    var semestre = $stateParams.semestre;
    $scope.semestre = {
      codigo: $stateParams.semestre.codigo,
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
      semestreFechas: [
        {nombre: 'Inicio semestre', fecha: new Date(semestre.semestreInicio), opened: false},
        {nombre: 'Cierre semestre', fecha: new Date(semestre.semestreCierre), opened: false}
      ],
      inscripcionFechas: [
        {nombre: 'Inicio inscripcion', fecha: new Date(semestre.inscripcionInicio), opened: false},
        {nombre: 'Cierre inscripcion', fecha: new Date(semestre.inscripcionCierre), opened: false}
      ]
    };
  }
  else {
    $state.go('semestres.lista');
  }

  $scope.open = function (item) {
    item.opened = !item.opened;
  }

  $scope.guardar = function () {
    var timestamp = null;
    var offset = null;
    offset = $scope.semestre.semestreFechas[0].fecha.getTimezoneOffset();

    timestamp = $scope.semestre.semestreFechas[0].fecha.getTime();
    var semestreInicio = new Date(timestamp + (-offset * 60 * 1000));

    timestamp = $scope.semestre.semestreFechas[1].fecha.getTime();
    var semestreCierre = new Date(timestamp + (-offset * 60 * 1000));

    timestamp = $scope.semestre.inscripcionFechas[0].fecha.getTime();
    var inscripcionInicio = new Date(timestamp + (-offset * 60 * 1000));

    timestamp = $scope.semestre.inscripcionFechas[1].fecha.getTime();
    var inscripcionCierre = new Date(timestamp + (-offset * 60 * 1000));

    var credenciales = {
      codigo: $scope.semestre.codigo,
      semestreInicio: semestreInicio,
      semestreCierre: semestreCierre,
      inscripcionInicio: inscripcionInicio,
      inscripcionCierre: inscripcionCierre,
      offset: -(new Date().getTimezoneOffset())
    }

    if ($scope.semestreForm.$invalid) {
      return '';
    }

    if (credenciales.semestreInicio >= credenciales.semestreCierre) {
      $ngConfirm({
        content: 'La fecha de inicio del semestre no puede ser mayor o igual que la fecha de cierre.',
        title: 'Error',
        type: 'red',
        backgroundDismiss: true
      });
      return '';
    }

    if (credenciales.inscripcionInicio >= credenciales.inscripcionCierre) {
      $ngConfirm({
        content: 'La fecha de inicio de las inscripciones no puede ser mayor o igual que la fecha de cierre.',
        title: 'Error',
        type: 'red',
        backgroundDismiss: true
      });
      return '';
    }

    if ($scope.semestre.modo == 'ACTUALIZAR') {
      actualizar(credenciales);
    }
    else if ($scope.semestre.modo == 'CREAR') {
      crear(credenciales);
    }
  }

  function actualizar(credenciales) {
    SemestreService.actualizar(credenciales)
    .then(function (res) {
      $ngConfirm({
        content: 'El semestre ha sido actualizado.',
        title: '',
        type: 'green',
        buttons: {
          Salir: {
            action: function (button, scope) {
              $state.go('semestres.lista')
            }
          }
        }
      });
    })
    .catch(function (err) {
      $log.log(err);
      if (err.data.code) {
        if (err.data.code == 3) {
          $ngConfirm({
            content: 'Ya existe un semestre con las fechas establecidas.',
            title: 'Error',
            type: 'red',
            backgroundDismiss: true
          });
        }
      } else {
        $ngConfirm({
          content: 'El semestre no ha sido actualizado, intentelo nuevamente.',
          title: 'Error',
          type: 'red',
          backgroundDismiss: true
        });
      }
      return '';
    });
  }

  function crear(credenciales) {
    SemestreService.crear(credenciales)
    .then(function (res) {
      $ngConfirm({
        content: 'El semestre ha sido creado',
        title: '',
        type: 'green',
        buttons: {
          Salir: {
            action: function (button, scope) {
              $state.go('semestres.lista')
            }
          }
        }
      });
    })
    .catch(function (err) {
      $log.log(err);
      if (err.data.code) {
        if (err.data.code == 3) {
          $ngConfirm({
            content: 'Ya existe un semestre con las fechas establecidas.',
            title: 'Error',
            type: 'red',
            backgroundDismiss: true
          });
        }
        else if (err.data.code == 4) {
          $ngConfirm({
            content: 'El semestre con el código ingresado ya existe.',
            title: 'Error',
            type: 'red',
            backgroundDismiss: true
          });
        }

      } else {
        $ngConfirm({
          content: 'El semestre no ha sido creado.',
          title: 'Error',
          type: 'red',
          backgroundDismiss: true
        });
      }
      return '';
    });
  }
}]);
