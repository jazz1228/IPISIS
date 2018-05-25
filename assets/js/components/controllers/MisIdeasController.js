ipisis.controller('MisIdeasController', ["$scope", "IdeaService", "StorageService", function($scope, IdeaService, StorageService) {
    
	IdeaService.obtenerMisIdeas({userS:StorageService.get("userSession", "session")})
      .success(function(data) {
        $scope.ideas = data;
      });
 	console.log("juancho"); 
    $scope.mostrar = function(idea) {
      $scope.id = idea.id;
      $scope.titulo = idea.titulo;
      $scope.descripcion = idea.descripcion;
      $scope.numMiembros = idea.numMiembros;
      $scope.numEquipos = idea.numEquipos;
      $scope.proponentes = idea.proponentes;
      $scope.asignaturas = idea.asignaturas;
      $scope.prerrequisitos = idea.prerrequisitos;
    };
         
      
  }]);
