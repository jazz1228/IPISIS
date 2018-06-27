var app = angular.module('ipisis');

app.service('PreinscripcionService',["$http", function($http){
	this.ideasPreinscripcion = function(){
		return $http.get('/idea/ideasAprobadas');
	};

	this.preinscribir = function(idea){
		return $http.post('/preinscripcion/preinscribir', idea);
	};

	this.getPreinscripcionIdea = function(idea){
		return $http.get('/preinscripcion/getPreinscripcionIdea', {params: idea});
	};
}]);
