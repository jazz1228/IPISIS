angular.module('ipisis')
.factory('InscripcionService', ['$http', function($http) {
	return {

		inscribir: function(credenciales) {
			var inscripcion = $http({
				url: '/oferta/inscribiroferta',
				method: 'POST',
        data: credenciales
			});
			return inscripcion;
		},

    getAllBySemestre: function (semestre) {
      var inscripciones = $http({
        url: '/inscripcion/getAllBySemestre',
        method: 'GET',
				params: semestre
      });
      return inscripciones;
    },

		gestionarInscripcion: function (parametros) {
			var inscripcion = $http({
				url: '/inscripcion/gestionarInscripcion',
				method: 'POST',
				data: parametros
			});
			return inscripcion;
		},

		getInscripcionesEquipo: function (parametros) {
			var equipo = $http({
				url: '/inscripcion/getInscripcionesEquipo',
				method: 'GET',
				params: parametros
			});
			return equipo;
		}
	};
}]);
