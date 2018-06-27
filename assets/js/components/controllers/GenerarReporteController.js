angular.module('ipisis')
.controller('GenerarReporteController',['$scope','$state','JefeService','FileSaver', 'Blob',
function ($scope, $state, JefeService,FileSaver, Blob) {

  $scope.descargarReporte= function() {
    JefeService.getReporte().then(function(datos) {
        datos.data.forEach(function(item) {
          for (var clave in item){
              if (item.hasOwnProperty(clave)) {
                if (clave==="fecha_actualizacion") {
                 item[clave]= item[clave].substring(0,19).replace('T',' ');
                }
              }
            }
      });
        $scope.reporte = datos.data;
    });
  }
  $scope.descargarReporte();

  $scope.exportarExcel= function() {
      let header = '<meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8">';
      let blob= new Blob([header + document.getElementById('exportable').innerHTML],{
        encoding: "UTF-16" ,type: "data:application/vnd.ms-excel;charset=UTF-8"
      });
      FileSaver.saveAs(blob,'report_file.xls');
  }

}])
