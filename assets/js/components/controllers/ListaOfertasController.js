angular.module('ipisis')
.controller('ListaOfertasController', ['$scope', 'OfertaService', 'SemestreService',
function ($scope, OfertaService, SemestreService ) {

	SemestreService.getSemestreActual()
	.then(function (res) {
		return OfertaService.getAllBySemestre({semestreCodigo: res.data.codigo});
	})
	.then(function (res) {
		$scope.ofertas = res.data;
	})
	.catch(function (err) {
		$log.log(err);
	})

	$scope.seleccionarOferta = function (oferta) {
		$scope.ofertaSeleccionada = oferta;
	}
}]);
