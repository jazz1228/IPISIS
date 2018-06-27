angular.module('ipisis')
.factory('ProfesorService', ['$http', function($http) {
	return {
    getAll: function() {
      var profesores = $http({
        url: '/profesor/getAll',
        method: 'GET',
      });
      return profesores;
    },
		getProyect: function (semestre_codigo) {
			var proyectos = $http({
				url: '/proyecto/getByTutor',
				method: 'GET',
				params:semestre_codigo
			});
			return proyectos
		},
		getEquipo: function (proyecto_id) {
			var equipo = $http({
				url: '/proyecto/getEquipo',
				method: 'GET',
				params:proyecto_id
			});
			return equipo
		}
	};
}]);
