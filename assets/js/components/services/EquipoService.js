angular.module('ipisis')
.factory('EquipoService', ['$http', function($http) {
	return {
		crear: function(credenciales) {
			var equipo = $http({
				url: '/equipo/crear',
				method: 'POST',
        data: credenciales
			});
			return equipo;
		},

		procesarInvitacion: function (credenciales) {
			var equipo = $http({
				url: '/equipo/procesarInvitacion',
				method: 'PUT',
				data: credenciales
			});
			return equipo;
		},

		salir: function (credenciales) {
			var equipo = $http({
				url: '/equipo/salir',
				method: 'DELETE',
				params: credenciales
			});
			return equipo;
		},

		getEquiposSession: function () {
			var equipos = $http({
				url: '/equipo/getAllBySession',
				method: 'GET'
			});
			return equipos;
		},

		getIntegrantes: function (equipo) {
			var integrantes = $http({
				url: '/equipo/getIntegrantes',
				method: 'GET',
				params: equipo
			});
			return integrantes
		},

		getEquipoInformacion: function (equipo) {
			var equipo = $http({
				url: '/equipo/getEquipoInformacion',
				method: 'GET',
				params: equipo
			});
			return equipo
		},

		addIntegrante: function (credenciales) {
			var equipo = $http({
				url: '/equipo/addIntegrante',
				method: 'POST',
				data: credenciales
			});
			return equipo
		}
	};
}]);
