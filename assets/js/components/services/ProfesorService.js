angular.module('ipisis')
.factory('ProfesorService', ['$http', function($http) {
	return {
    getAll: function() {
      var profesores = $http({
        url: '/profesor/getAll',
        method: 'GET',
      });
      return profesores;
<<<<<<< HEAD
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
=======
    }
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
	};
}]);
