angular.module('ipisis')
.controller('SigninController', ['$scope', '$state', 'AuthService', 'ROLES',
function ($scope, $state, AuthService, ROLES) {

	// Función para el inicio de sesión en la plataforma.
	$scope.signinUsuario = function() {
		//Definición de variables.
		var usuario = null;
		var contrasena = null;
		var credenciales = null;

		// Validaciones del formulario.
		if (!$scope.user) {
			return;
		}

		usuario = $scope.user.usuario;
		if (!usuario) {
			return;
		}

		contrasena = $scope.user.contrasena;
		if (!contrasena) {
			return;
		}

		//Inicialización de las credenciales de inicio de sesión.
		credenciales = {
			username: usuario,
			password: contrasena
		};
		$scope.signing = true;
		//Llamado al servicio de signin.
		AuthService.signinUsuario(credenciales)
		.then(function(res) {
			rol = AuthService.getRol();
			if (rol === ROLES.JEFE) {$state.go('jefe');}
			else if (rol === ROLES.COMITE) {$state.go('comite');}
			else if (rol === ROLES.PROFESOR) {$state.go('profesor');}
			else if (rol === ROLES.ESTUDIANTE) {$state.go('estudiante');}
		})
		.catch(function(err) {
			$scope.signing = false;
			$scope.loginError = true;
			$scope.errorMensaje = "No se ha podido iniciar sesión, verifique su nombre de usuario o contraseña.";
		});
	};

	// switch flag
	$scope.switchError = function (value) {
		$scope[value] = !$scope[value];
	};

}]);
