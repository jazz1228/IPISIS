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
