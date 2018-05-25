var ipisis = angular.module('ipisis');
/*
  Controlador para ofertar las ideas aprobadas en un semestre.
 */
ipisis.controller('OfertarIdeasController', ["$scope", 'IdeaService', "ProfesorService", "$state", "$stateParams", "SemestreService",
  function($scope, IdeaService, ProfesorService, $state, $stateParams, SemestreService) {

    $scope.semestre = "";
    $scope.ideas = [];

    SemestreService.getAll()
      .success(function(data) {
        $scope.semestres = data;
        $('#inicialModal').modal('show');
      });

    $scope.mostrar = function(idea, index) {
      $scope.id = idea.id;
      $scope.titulo = idea.titulo;
      $scope.descripcion = idea.descripcion;
      $scope.numMiembros = idea.numMiembros;
      $scope.numEquipos = idea.numEquipos;
      $scope.proponentes = idea.proponentes;
      $scope.asignaturas = idea.asignaturas;
      $scope.prerrequisitos = idea.prerrequisitos;
      $scope.historialIdea = idea.historialIdea;
      $scope.index = index;

    };


    $scope.modalInicial = function() {
      $('#inicialModal').modal('show');
    }

    $scope.oferIdea = function(ideaA) {
      ideaOferta = {
        ideaId: ideaA,
        tutores: $scope.tutores,
        semestre: $scope.semestre
      };
      IdeaService.ofertarIdea(ideaOferta)
        .success(function(data) {
          $scope.ideas.splice($scope.index, 1);
          $scope.id = "";
          $scope.titulo = "";
          $scope.descripcion = "";
          $scope.numMiembros = "";
          $scope.numEquipos = "";
          $scope.proponente = "";
          $scope.asignatura = "";
          $scope.prerrequisitos = "";
          $scope.index = "";
        });
    };

    $scope.buscarIdeas = function(semes) {
      if ($scope.semestre !== "") {
        IdeaService.obtenerIdeasAprobadas()
          .success(function(data) {
            $scope.ideas = data;
          });
      }
    };

    ProfesorService.getAll()
      .success(function(data) {
        $scope.listProfesores = data;
      });

    $scope.rango = function(j) {
      var range = [];
      for (var i = 1; i <= j; i++) {
        range.push(i);
      }
      $scope.tutores = new Array(j);
      $scope.range = range;
    };
  }
]);
