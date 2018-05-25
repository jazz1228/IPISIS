var ipisis = angular.module('ipisis');

ipisis.controller('CrearIdeaController', ['$scope', '$state', '$ngConfirm', 'IdeaService', 'PrerrequisitoService',
function($scope, $state, $ngConfirm, IdeaService, PrerrequisitoService) {

  $scope.idea = {
    titulo: '',
    descripcion: '',
    numEquipos: '',
    numMiembros: '',
    proponentes: [],
    asignaturas: [],
    prerrequisitos: []
  };

  $scope.nomMaterias = [];

  PrerrequisitoService.getAreasPrerrequisitos()
  .success(function(data) {
    $scope.areas = data;
  });

  IdeaService.obtenerAsignaturas()
  .success(function (data) {
    $scope.asignaturas = data
  });

  /*
  Función 'guardarPrerrequisito', agrega en el arreglo 'idea.materia' el código
  de la materia que será un prerrequisito de la idea, y en el arreglo
  'nomMaterias' el nombre de dicha materia para mostrarla en la lista de selección
  de prerrequisitos
  */
  $scope.guardarPrerrequisito = function(codigo, nombre) {
    $scope.idea.prerrequisitos.push(codigo);
    $scope.nomMaterias.push(nombre);
  };

  /*
  Función 'eliminarPrerrequisito', elimina en el arreglo 'idea.materia' el código
  de la materia que ya no será un prerrequisito de la idea, y en el arreglo
  'nomMaterias' el nombre de dicha materia para quitarla de la lista de selección
  de prerrequisitos
  */
  $scope.eliminarPrerrequisito = function(index) {
    $scope.idea.prerrequisitos.splice(index, 1);
    $scope.nomMaterias.splice(index, 1);
  };

  $scope.inscribirIdea = function() {
    if (!$scope.ideaForm.$valid) {
      return;
    }

    if ($scope.idea.prerrequisitos.length <= 0) {
      $ngConfirm({
        title: 'Error',
        content: 'Seleccione por lo menos un prerrequisito para la idea.',
        columnClass: 's',
        type: 'red',
        scope: $scope,
        buttons: {
          Salir: {
            btnClass: 'btn-red',
            action: function (scope, button) {
            }
          }
        }
      });
      return;
    }


    IdeaService.crearIdea($scope.idea)
    .then(function(record) {
      $ngConfirm({
        title: 'Idea creada',
        content: 'La idea ha sido inscrita correctamente.',
        columnClass: 's',
        type: 'green',
        scope: $scope,
        buttons: {
          Salir: {
            btnClass: 'btn-green',
            action: function (scope, button) {
              $scope.cargarPagina();
            }
          }
        }
      });
    })
    .catch(function(err) {
      $ngConfirm({
        title: 'Error',
        content: 'La idea no ha sido sido inscrita, por favor intente nuevamente.',
        columnClass: 's',
        type: 'red',
        scope: $scope,
        buttons: {
          Salir: {
            btnClass: 'btn-red',
            action: function (scope, button) {
            }
          }
        }
      });
      //console.log(err)
    })
  };

  $scope.cargarPagina = function () {
    $state.reload();
  }

  $scope.rangoAsignaturas = function(j) {
    var range = [];
    for (var i = 1; i <= j; i++) {
      range.push(i);
    }
    $scope.idea.asignaturas = new Array(j);
    $scope.rangeAsignaturas = range;
  };

  $scope.rangoProponentes = function(j) {
    var range = [];
    for (var i = 1; i <= j; i++) {
      range.push(i);
    }
    $scope.idea.proponentes = new Array(j);
    $scope.rangeProponentes = range;
  };

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
