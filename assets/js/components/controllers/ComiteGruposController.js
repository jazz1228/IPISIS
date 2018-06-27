var ipisis = angular.module('ipisis');
ipisis.controller('ComiteGruposController', ['$scope', '$state', '$ngConfirm', '$stateParams', 'ComiteService',
    function ($scope, $state, $ngConfirm, $stateParams, ComiteService) {

        cargarAsignaturas();
        cargarSemestres();

        function cargarAsignaturas(){
            ComiteService.obtenerAsignaturas()
            .success(function (data) {   
                $scope.asignaturas = data
            });
        } 
        
        function cargarSemestres() {
            ComiteService.getAllSemesters()
                .then(function (res) {
                    $scope.semestres = res.data;
                })
                .catch(function (err) {
                    $log.log(err);
                });
        }

         $scope.obtenerGrupos= function(){
            let asignatura = $scope.compromiso.asignatura;
            let semestre = $scope.semestre
            let credenciales = {curso_id:asignatura,semestre_id:semestre}

            if(asignatura && semestre){
                ComiteService.obtenerGrupos(credenciales)
                .success(function (data) {                       
                    $scope.grupos = data
                });
            }
        }
        $scope.buscarGrupo=function(asignatura,semestre,grupo){
            console.log(asignatura,semestre,grupo)
        }
    }]);
