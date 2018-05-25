angular.module('ipisis')
.factory('ProfesorService', ['$http', function($http) {
	return {
    getAll: function() {
      var profesores = $http({
        url: '/profesor/getAll',
        method: 'GET',
      });
      return profesores;
    }
	};
}]);
