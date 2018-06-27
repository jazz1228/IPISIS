angular.module('ipisis')
.factory('OfertaService', ['$http', function($http) {
	return {
		getAllBySemestre: function(semestre) {
			var ofertas = $http({
				url: '/oferta/getAllBySemestre',
				method: 'GET',
				params: semestre
			});
			return ofertas;
		}
	};
}]);
