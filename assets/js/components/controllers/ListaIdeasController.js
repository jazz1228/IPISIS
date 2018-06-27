/**
Controlador para manejar las ideas que están en el estado 'APROBADO'
**/
ipisis.controller('ListaIdeasController', ["$scope", "IdeaService", function($scope, IdeaService) {
  IdeaService.obtenerIdeasAprobadas()
    .success(function(data) {
      $scope.ideas = data;
    });

  $scope.mostrar = function(idea) {
    $scope.id = idea.id;
    $scope.titulo = idea.titulo;
    $scope.descripcion = idea.descripcion;
    $scope.numMiembros = idea.numMiembros;
    $scope.numEquipos = idea.numEquipos;
    $scope.proponentes = idea.proponentes;
    $scope.asignaturas = idea.asignaturas;
    $scope.prerrequisitos = idea.prerrequisitos;
<<<<<<< HEAD
  };
}]);
=======
  };  
    
    
}]);



>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
