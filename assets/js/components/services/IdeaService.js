var app = angular.module('ipisis');

angular.module('ipisis')
.factory('IdeaService', ["$http", function($http) {
  return {
    crearIdea: function(idea) {
      var idea = $http({
        url: '/idea/crearIdea',
        method: 'POST',
        data: idea
      });
      return idea;
    },
    obtenerIdeasAprobadas: function () {
      var ideas = $http({
        url: '/idea/ideasAprobadas',
        method: 'GET'
      });
      return ideas;
    },

    obtenerIdeasPropuestas: function () {
      var ideas = $http({
        url: '/idea/ideasPropuestas',
        method: 'GET'
      });
      return ideas;
    },
<<<<<<< HEAD
=======
    obtenerMisIdeas: function (user) {
      var ideas = $http({
        url: '/idea/misIdeas',
        method: 'GET',
        params: user
      });
      return ideas;
    },
>>>>>>> a73044b223a0a845ccb4dcf491ecf6a00e3902c2

    obtenerAsignaturas: function () {
      var asignaturas = $http({
        url: '/materia/findMateriaProyecto',
        method: 'GET'
      });
      return asignaturas;
    },

    aprobarIdeas: function (ideasAprobar) {
      var ideas = $http({
        url: '/idea/aprobarIdeas',
        method: 'POST',
        data: ideasAprobar
      });
      return ideas;
    },
    ofertarIdea: function (ideaOfertar) {
      var oferta = $http({
        url: '/idea/ofertarIdea',
        method: 'POST',
        data: ideaOfertar
      });
      return oferta;
    },
  }
}]);
