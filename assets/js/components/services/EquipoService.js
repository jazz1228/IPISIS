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
<<<<<<< HEAD
		},

		obtenerFormatoActa: function () {
			var formato = $http({
				url: '/actaInicio/writeFile',
				method: 'POST'
			});
			return formato
		},
		getCompromisos: function (data) {
			var compromisos = $http({
				url: '/ProyectoCompromiso/getCompromisosByProject',
				method: 'GET',
				params:data
			});
			return compromisos
		},
		firmarActa: function (data) {
			var acta = $http({
				url: '/ContenidoSeccion/entregaActa',
				method: 'POST',
				params:data
			});
			return acta
		},
		getUsuariosSinFirma:function(data){
			var usuarios = $http({
				url: '/ContenidoSeccion/getUserFirma',
				method: 'POST',
				params:data
			});
			return usuarios
		}

=======
		}
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2
	};
}]);
