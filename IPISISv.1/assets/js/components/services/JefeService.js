angular.module('ipisis')
.factory('JefeService', ['$http','FileSaver', 'Blob', function($http, FileSaver, Blob) {
	return {

		// Servicio para obtener una lista de los profesores registrados en el sistema.
		getProfesores: function() {
			var profesores = $http({
				url: '/profesor/getAll',
				method: 'GET',
			});
			return profesores;
		},

		getReporte: function(){
			let reporte=  $http({
			    url: '/reporte/proyectosAsignados',
			    method: "GET",
			});
			return reporte;
		}
	};
}]);
