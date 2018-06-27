angular.module('ipisis').factory('PrerrequisitoService', ['$http', function ($http) {
  return {
    getAreasPrerrequisitos: function () {
      var areasPrerrequisitos = $http({
        url: '/area/find',
        method: 'GET'
      });
      return areasPrerrequisitos;
    }
  }
}])
