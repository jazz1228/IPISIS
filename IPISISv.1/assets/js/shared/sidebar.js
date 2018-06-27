var ipisis = angular.module('ipisis');

ipisis.directive('sidebar', function () {
	return {
		restric: 'E',
		templateUrl: 'templates/public/sidebar.html',
		scope: {
			toggled: "="
		},
		controller: 'sidebarCtrl'
	};
});

ipisis.controller('sidebarCtrl', ['$scope', 'AuthService', 'ROLES',
function($scope, AuthService, ROLES){
	$scope.rol = AuthService.getRol();

	$scope.$on('renovarRol', function (evt) {
		$scope.rol = AuthService.getRol();
	});

	$scope.isProfesor = function () {return $scope.rol === ROLES.PROFESOR;};
	$scope.isEstudiante = function () {return $scope.rol === ROLES.ESTUDIANTE;};
	$scope.isJefe = function () {return $scope.rol === ROLES.JEFE;};
	$scope.isComite = function () {return $scope.rol === ROLES.COMITE;}
}]);
