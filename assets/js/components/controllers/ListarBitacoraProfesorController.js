angular.module('ipisis')
.controller('ListarBitacoraProfesorController', ['$scope','$rootScope','$state', 'EstudianteService','EquipoService','$stateParams','$ngConfirm',
	function ($scope, $rootScope,$state ,EstudianteService,EquipoService,$stateParams,$ngConfirm) {
	
	cargarBitacoras();
	$scope.equipo=$stateParams.equipo;
	function cargarBitacoras(){
		EstudianteService.getProyectoEquipo({equipo_id:$stateParams.equipo.inscripcion.equipoCodigo})
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

	$scope.cargarInformacion = function () {
		EquipoService.getEquipoInformacion({equipoCodigo: $scope.equipo.inscripcion.equipoCodigo})
		.then(function (res) {
			$state.go('compromiso',{equipo:res.data , profesor:'OK'});
		})
		.catch(function (err) {
		  $log.log(err);
		});
	  }
     $scope.obtenerBitacoras = function(){
        let param = $stateParams.proyecto.id
		param={proyecto_id:param}
        EstudianteService.getBitacoras(param)
        .success(function(resultado) {
        $rootScope.bitacoras = resultado;
        });
    }

    $scope.ordenarBitacoraPor = function(ordenPor) {
      $scope.ordenadoBitacora = ordenPor;
    };

    $scope.seleccionarOpcion = function () {
        $state.go('profesor-listar-bitacora',{equipo:$stateParams.equipo , proyecto:$stateParams.proyecto})
    }; 
    $scope.irACrearBitacora = function () {		
        $state.go('crearBitacoraP',{equipo:$stateParams.equipo,proyecto:$stateParams.proyecto,profesor:'OK'})
    };
    $scope.actualizar = function (bitacora) {
        $state.go('crearBitacoraP', {equipo:$stateParams.equipo,bitacora: bitacora,proyecto:$stateParams.proyecto ,profesor:'OK',modo: 'ACTUALIZAR'});
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
