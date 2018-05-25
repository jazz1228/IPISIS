angular.module('ipisis')
.factory('EstudianteService', ['$http', function($http) {
	return {
		getEstudiante: function(credenciales) {
			var estudiante = $http({
				url: '/estudiante/getByUsuario',
				method: 'GET',
        params: credenciales
			});
			return estudiante;
		},

		getEstudianteSession: function () {
			var estudiante = $http({
				url: '/estudiante/getBySession',
				method: 'GET',
			});
			return estudiante;
		}
	};
}]);
