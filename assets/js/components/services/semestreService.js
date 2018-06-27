angular.module('ipisis')
.factory('SemestreService', ["$http", function($http) {
  return {
    crear: function (credenciales) {
      var semestre = $http({
        url: '/semestre/crear',
        method: 'POST',
        data: credenciales
      });
      return semestre;
    },

    actualizar: function (credenciales) {
      var semestre = $http({
        url: '/semestre/actualizar',
        method: 'PUT',
        data: credenciales
      });
      return semestre;
    },

    eliminar: function (credenciales) {
      var semestre = $http({
        url: '/semestre/eliminar',
        method: 'DELETE',
        params: credenciales
      });
      return semestre;
    },

    getAll: function() {
      var semestre = $http({
        url: '/semestre/getAll',
        method: 'GET',
      });
      return semestre;
    },

    getSemestreActual: function () {
      var semestre = $http({
        url: '/semestre/getSemestreActual',
        method: 'GET',
      });
      return semestre;
    }
  }
}]);
