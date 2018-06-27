angular.module('ipisis')
	.factory('ComiteService', ['$http', function ($http) {
		return {
			crearFormato: function (credenciales) {
				var formato = $http({
					url: '/formato/create',
					method: 'POST',
					data: credenciales
				});
				return formato;
			},
			crearCompromiso: function (credenciales) {
				var compromiso = $http({
					url: '/materiaCompromiso/create',
					method: 'POST',
					data: credenciales,
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined}
				});
				return compromiso;
			},
			crearCompromisoYFormato: function (credenciales) {
				var compromiso = $http({
					url: '/materiaCompromiso/createWithFormat',
					method: 'POST',
					data: credenciales,
					transformRequest: angular.identity,
					headers: { 'Content-Type': undefined}
				});
				return compromiso;
			},
			getAllSemesters: function () {
				var semestre = $http({
					url: '/semestre/getAll',
					method: 'GET',
				});
				return semestre;
			},
			obtenerAsignaturas: function () {
				var asignaturas = $http({
					url: '/materia/findMateriaProyecto',
					method: 'GET'
				});
				return asignaturas;
			},
			obtenerGrupos: function (credenciales) {
				var grupos = $http({
					url: '/equipo/getByCurso',
					method: 'POST',
					data: credenciales
				});
				return grupos;
			},
			getAllFormats: function () {
				var formatos = $http({
					url: '/formato/getAll',
					method: 'GET'
				});
				return formatos;
			},
			crearActa: function (credenciales) {
				var acta = $http({
					url: '/actaInicio/saveFile',
					method: 'POST',
					data: credenciales
				});
				return acta;
			}
		

		};
	}]);
