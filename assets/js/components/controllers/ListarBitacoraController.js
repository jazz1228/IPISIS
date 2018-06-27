angular.module('ipisis')
.controller('ListarBitacoraController', ['$scope','$rootScope','$state', 'EstudianteService','$stateParams','$ngConfirm',
	function ($scope, $rootScope,$state ,EstudianteService,$stateParams,$ngConfirm) {

	cargarBitacoras();
	function cargarBitacoras(){
		EstudianteService.getProyectoEquipo({equipo_id:$stateParams.equipo.codigo})
		.then(function (res) {
			let param = {proyecto_id:res.data[0].id}
			EstudianteService.getBitacoras(param)
			.success(function(resultado) {
			$rootScope.bitacoras = resultado;
			});
		})
		.catch(function (err) {
			console.log(err);
		});

	}
     $scope.obtenerBitacoras = function(equipo){
        let param = equipo.inscripcion.proyecto.id
        param={proyecto_id:param}
        EstudianteService.getBitacoras(param)
        .success(function(resultado) {
        $rootScope.bitacoras = resultado;
        }); 
	}
	$scope.obtenerCompromisos = function (equipo) {
		$state.go('equipo.compromiso',{equipo:equipo});
	}

    $scope.ordenarBitacoraPor = function(ordenPor) {
      $scope.ordenadoBitacora = ordenPor;
    };

    $scope.seleccionarOpcion = function (equipo) {
        $state.go('equipo.listar-bitacora',{equipo:equipo})
    };
    $scope.irACrearBitacora = function () {
        $state.go('equipo.crearBitacora')
    };
    $scope.actualizar = function (bitacora) {
        $state.go('equipo.crearBitacora', {bitacora: bitacora, modo: 'ACTUALIZAR'});
      };
		$scope.eliminar = function (bitacora){
			$ngConfirm({
				content: '¿Está seguro que desea eliminar la bitácora?',
				title: 'Alerta!',
				type: 'orange',
				backgroundDismiss: true,
				buttons: {
					Salir: {
						action: function (button, scope) {
							return true;
						}
					},
					Aceptar: {
						btnClass: 'btn-success',
						action: function (button, scope) {
							EstudianteService.eliminar({bitacora_id: bitacora.id})
							.then(function (res) {
								$scope.bitacoras.splice($scope.bitacoras.indexOf(bitacora), 1);
							})
							.catch(function (err) {
								if (err.data) {
									if (err.data.code == 3) {
										$ngConfirm({
											content: err.data.msg,
											title: 'Error',
											type: 'red',
											backgroundDismiss: true
										});
										return '';
									}
								}
								$ngConfirm({
									content: 'La bitacora no se ha podido eliminar, intentelo nuevamente.',
									title: 'Error',
									type: 'red',
									backgroundDismiss: true
								});
								return '';
							});          }
						}
					}
				});
				return '';
		}
}]);
