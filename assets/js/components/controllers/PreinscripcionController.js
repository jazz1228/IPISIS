var app = angular.module('ipisis');

app.controller('PreinscripcionController',['$scope', '$ngConfirm', 'PreinscripcionService', '$state',
	function($scope, $ngConfirm, PreinscripcionService, $state) {
	PreinscripcionService.ideasPreinscripcion()
  .success(function(data) {
		$scope.ideas = data;

		angular.forEach($scope.ideas, function (idea, index) {
			PreinscripcionService.getPreinscripcionIdea({idea_id: idea.id})
			.success(function (resultado) {
				if (resultado) {
					$scope.ideas[index].preinscritos = resultado.length;
				}
			});
		});
	});

	$scope.seleccionarIdea = function (idea) {
		$scope.ideaSeleccionada = idea;
		$ngConfirm({
			title: '',
			contentUrl: 'templates/private/equipo/detallepreinscripcion.html',
			backgroundDismiss: true,
			columnClass: 'l',
			scope: $scope,
			buttons: {
				Salir: {
					btnClass: 'btn-default',
					action: function (scope, button) {
						$scope.error = false;
						return true;
					}
				},
				Preinscribir: {
					btnClass: 'btn-success',
					action: function (scope, button) {
						var credenciales = {
							equipoCodigo: 1,
							ideaId: $scope.ideaSeleccionada.id,
							asignaturaCodigo: $scope.asignatura
						};

						PreinscripcionService.preinscribir(credenciales)
						.success(function (data) {
							$ngConfirm('Usted ha sido preinscrito a la idea seleccionada.');
							$scope.ideaSeleccionada.preinscritos++;
						})
						.error(function (err) {
							if (err.code) {
								code = err.code;
								if (code == 1) {
									$ngConfirm('Su equipo ha alcanzado la cantidad máxima de preinscripciones.');
								} else if (code == 2) {
									$ngConfirm('Su equipo ya está preinscrito a la idea seleccionada.')
								}
							}
						});
					}
				},
			}
		});
	}
}]);
