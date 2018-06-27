angular.module('ipisis')
.controller('ListaProfesoresController', ['$scope', 'JefeService',
	function ($scope, JefeService) {

    // Llamado al servicio que obtiene la listaa completa de profesores.
    // Los profesores se almacenan en el scope del controlador.
		JefeService.getProfesores()
    .success(function(resultado) {
      $scope.profesores = resultado;
    });

    // Funcion helper para ordenar la lista de profesores.
    $scope.ordenarPor = function(ordenPor) {
      $scope.ordenado = ordenPor;
    };
}]);
