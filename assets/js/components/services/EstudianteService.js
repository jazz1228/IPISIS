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
<<<<<<< HEAD
		},
		getBitacoras: function(credenciales){
			var bitacoras = $http({
				url: '/bitacora/getByProject',
				method: 'GET',
        		params: credenciales
			});
			return bitacoras;
		},
		crearBitacora: function(credenciales){
			var bitacora = $http({
				url: '/bitacora/create',
				method: 'POST',
				data: credenciales,
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined}
			});
			return bitacora;
		},
		actualizarBitacora: function(credenciales){
			var bitacora = $http({
				url: '/bitacora/update',
				method: 'POST',
				data: credenciales,
				transformRequest: angular.identity,
				headers: { 'Content-Type': undefined}
			});
			return bitacora;
		},
		eliminar: function (credenciales) {
     		var bitacora = $http({
        	url: '/bitacora/delete',
        	method: 'DELETE',
        	params: credenciales
      		});
      	return bitacora;
		},
		getProyectoEquipo: function(credenciales){
				var project = $http({
				url: '/proyecto/getProjectByEquipo',
				method: 'GET',
        		params: credenciales
			});
			return project;
		},
=======
		}
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
	};
}]);
