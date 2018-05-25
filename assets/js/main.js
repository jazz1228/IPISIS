'use stric';
var ipisis = angular.module('ipisis', ['ui.router', 'permission', 'permission.ui', 'ui.bootstrap',
	'ngMessages' , 'ngPassword', 'ngAnimate', 'cp.ngConfirm', 'ngFileSaver']);

// Inicializacion de la configuracion principal al ingresar al dominio.
ipisis.run(['$rootScope', 'StorageService','PermRoleStore', 'ROLES',
		function($rootScope, StorageService, PermRoleStore, ROLES) {
			$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
				if (!fromState.name) {
					if (StorageService.get("auth_token", "session")) {
						rol = StorageService.get("rol", "session");
						if (rol) {
							PermRoleStore.defineRole(ROLES.ANON, function() {return false;});
							PermRoleStore.defineRole(ROLES.JEFE, function() {return false;});
							PermRoleStore.defineRole(ROLES.COMITE, function() {return false;});
							PermRoleStore.defineRole(ROLES.PROFESOR, function() {return false;});
							PermRoleStore.defineRole(ROLES.ESTUDIANTE, function() {return false;});
							PermRoleStore.defineRole(rol, function() {return true;});
							$rootScope.$broadcast('renovarRol');
						}
					} else {
						PermRoleStore.clearStore();
						PermRoleStore.defineRole(ROLES.ANON, function() {return true;});
						PermRoleStore.defineRole(ROLES.JEFE, function() {return false;});
						PermRoleStore.defineRole(ROLES.COMITE, function() {return false;});
						PermRoleStore.defineRole(ROLES.PROFESOR, function() {return false;});
						PermRoleStore.defineRole(ROLES.ESTUDIANTE, function() {return false;});
						$rootScope.$broadcast('renovarRol');
					}
				}
			});
		}
]);

// Controlador del root
ipisis.controller('mainCtrl', ['$scope', function($scope) {
		// Variable para controlar el desplazamiento del sidebar.
		$scope.toggled = true;
	}
]);

ipisis.constant('ROLES', {
	ANON: '500',
	JEFE: '505',
	COMITE: '504',
	PROFESOR: '503',
	ESTUDIANTE: '1005'||'502'
});

// filtro para capitalizar la primer letra de una palabra
ipisis.filter('capitalize', function() {
	return function(input) {
			return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
	}
});
