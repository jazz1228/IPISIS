var ipisis = angular.module('ipisis');

ipisis.directive('topbar', function () {
	return {
		restric: 'E',
		templateUrl: 'templates/public/topbar.html',
		scope: {
			toggled: "="
		},
		controller: 'topbarCtrl'
	};
});

ipisis.controller('topbarCtrl', ['$scope', '$state', 'AuthService', 'StorageService',
function($scope, $state, AuthService, StorageService) {

	$scope.autenticado = AuthService.isAutenticado();

	$scope.$on('renovarRol', function(evt) {
		$scope.autenticado = AuthService.isAutenticado();
	});

	$scope.signout = function () {
		AuthService.signout();
	}
}]);
