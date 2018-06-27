/*
Controlador 'ideasPropuestas' para manejar las ideas que estan en el estado 'PROPUESTA'
*/
ipisis.controller('PropuestasIdeaController', ["$scope", "IdeaService", "$state", "$stateParams",
  function($scope, IdeaService, $state, $stateParams) {
    IdeaService.obtenerIdeasPropuestas()
      .success(function(data) {
        $scope.ideas = data;
      });

    $scope.ideasSelected = [];

    $scope.guardarOdescartar = function(idea) {
      var i = $scope.ideasSelected.indexOf(idea);
      if (i === -1) {
        $scope.ideasSelected.push(idea);
      } else {
        $scope.ideasSelected.splice(i, 1);
      }
    }

    $scope.aprobarIdeas = function(op) {
      var ideaIds = [];
      angular.forEach($scope.ideasSelected, function (idea, i) {
        ideaIds.push(idea.id);
      })

      obje = {
        ideasId: ideaIds,
        observacion: $scope.observacion,
        opcion: op
      };

      IdeaService.aprobarIdeas(obje)
        .success(function(data) {
          for (i in $scope.ideasSelected) {
            var i = $scope.ideas.indexOf($scope.ideasSelected[i]);
            $scope.ideas.splice(i, 1);
          }

          $scope.ideasSelected = [];
          $scope.ideasIndex = [];
          $scope.observacion = "";
          $scope.id = "";
          $scope.titulo = "";
          $scope.descripcion = "";
          $scope.numMiembros = "";
          $scope.numGrupos = "";
          $scope.proponente = "";
          $scope.asignatura = "";
          $scope.prerrequisitos = "";
          $scope.obsIdea = "";
        });
    }

    $scope.seleccionar = function(idea) {
      var i = $scope.ideasSelected.indexOf(idea);
      if (i === -1) {
        return false;
      } else {
        return true;
      }
    }

    $scope.mostrar = function(idea) {
      $scope.id = idea.id;
      $scope.titulo = idea.titulo;
      $scope.descripcion = idea.descripcion;
      $scope.numMiembros = idea.numMiembros;
      $scope.numEquipos = idea.numEquipos;
      $scope.proponentes = idea.proponentes;
      $scope.prerrequisitos = idea.prerrequisitos;
      $scope.asignaturas = idea.asignaturas;
    };
  }
]);
