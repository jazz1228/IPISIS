var ipisis = angular.module('ipisis');

ipisis.filter('trusted', function($sce){
	return function(html){
	  return $sce.trustAsHtml(html)
	}
});
ipisis.controller('ComiteActaController', ['$scope', '$state', '$log', '$ngConfirm', '$stateParams', 'ComiteService',
function($scope, $state, $log, $ngConfirm, $stateParams,ComiteService) {
    
 //Modifica los elementos de la barra de herramientas de ckeditor
 $scope.config = {}; 
 $scope.config.language = 'es';
 $scope.config.toolbarGroups = [
 { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
{ name: 'insert', groups: [ 'insert' ] },
{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
{ name: 'links', groups: [ 'links' ] },
 { name: 'paragraph', groups: [ 'list', 'indent', 'align', 'paragraph' ] },
{ name: 'styles', groups: [ 'styles' ] },
{ name: 'colors', groups: [ 'colors' ] }
];
$scope.config.removeButtons = 'BGColor,Anchor,Subscript,Superscript,Undo,Redo,Flash,PageBreak,Iframe,PasteText,PasteFromWord,Styles,Scayt';
$scope.config.allowedContent= true;
$scope.config.entities= false;

$scope.acta={
    encabezado:'',
    contenido:'',
    piePagina: ''
}
$scope.acta.encabezado= `<p style="text-align:center"><span style="color:rgb(0, 0, 0)">
<strong>DEPARTAMENTO DE INGENIER&Iacute;A DE SISTEMAS</strong></span><br />
<span style="color:rgb(0, 0, 0)"><strong>FACULTAD DE INGENIER&Iacute;A</strong></span><br /> 
<span style="color:rgb(0, 0, 0)"><strong>UNIVERSIDAD DE ANTIOQUIA</strong></span></p> <p style="text-align:center">
<span style="font-size:16px"><span style="color:rgb(0, 0, 0)"><strong>ACTA DE INICIO Y COMPROMISO</strong></span></span><br /> 
<span style="font-size:16px"><span style="color:rgb(0, 0, 0)"><strong>PROYECTOS INTEGRADORES</strong></span></span></p>`

$scope.acta.contenido= `<p style="text-align:justify"><span style="color:rgb(0, 0, 0)">
<span style="font-family:arial; font-size:11pt">Mediante la firma del presente documento, el tutor y los estudiantes involucrados en el proyecto nos comprometemos a cumplir cabalmente con los principios acad&eacute;micos del proyecto integrador y el cronograma para su ejecuci&oacute;n y evaluaci&oacute;n, descritos ampliamente en el documento&nbsp;</span><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span><span style="font-family:arial; font-size:11pt">&nbsp;, los cuales se resumen a continuaci&oacute;n:</span></span></p> <p>&nbsp;</p> <ul> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Concretar el concepto de proyecto, es decir, desarrollar un trabajo en el que a) se justifique el estudio o la modificaci&oacute;n, con rigurosidad, de una situaci&oacute;n; b) se establezcan unos objetivos -general y espec&iacute;ficos- a alcanzar; c) se formule un plan de actividades para obtenerlos; d) se definan unos recursos para llevar a cabo las actividades del plan y, e) se precise un m&eacute;todo que valide los logros.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Aplicar la noci&oacute;n de integraci&oacute;n durante la ejecuci&oacute;n del proyecto, que se debe manifestar como m&iacute;nimo a trav&eacute;s de la confluencia de dos &aacute;reas acad&eacute;micas del programa.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Garantizar la prevalencia del trabajo en equipo para la realizaci&oacute;n de la propuesta y, por ende, de la concreci&oacute;n del concepto de proyecto.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Realizar la socializaci&oacute;n de lo realizado en el proceso y del resultado del proyecto.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Respetar los derechos de propiedad intelectual, dando cr&eacute;dito y referenciando con precisi&oacute;n todos los elementos usados en el proyecto que sean tomados de otras fuentes.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">El tutor del proyecto orientar&aacute; acad&eacute;micamente a los estudiantes, al menos dos horas a la semana, para definir junto con ellos los elementos de la propuesta, evaluar&aacute; continuamente la ejecuci&oacute;n de la misma para asignar las notas de seguimiento, y acompa&ntilde;ar&aacute; la construcci&oacute;n del informe final.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Cumplir con los plazos establecidos para cada actividad evaluativa de la asignatura.</span></span></p> </li> </ul> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><strong>Cronograma de evaluaci&oacute;n</strong></span></p> <table border="1" cellpadding="1" cellspacing="1" style="width:700px"> <thead> <tr> <th scope="col"><span style="color:rgb(0, 0, 0)"><strong>&Iacute;tem</strong></span></th> <th scope="col"><span style="color:rgb(0, 0, 0)"><strong>Fecha o plazo</strong></span></th> <th scope="col"><span style="color:rgb(0, 0, 0)">Peso</span></th> </tr> </thead> <tbody> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Acta de inicio y compromiso (semana #2)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">12/02/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Formalizaci&oacute;n de la propuesta (semana #2)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">23:59 horas, 16/02/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></td> </tr> <tr> <td> <table style="border-collapse:collapse; border-color:initial; border-style:none; border-width:initial"> <tbody> <tr> <td style="vertical-align:top"> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ajustes de Propuestas (semana #4)</span></span></p> </td> <td style="text-align:justify; vertical-align:middle">&nbsp;</td> </tr> </tbody> </table> </td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">02/03/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #4)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">02/03/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #10)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20/04/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #15)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">25/05/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Informe final</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">12:00 horas, 25/05/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Sustentaci&oacute;n</span></td> <td style="text-align:justify">
<span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">30/05/2018</span></td> <td style="text-align:justify">
<span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span><br /> &nbsp;</td> </tr> </tbody> </table>`

$scope.configurarActa= function(){
  crear($scope.acta);
}

function crear(data) {
  ComiteService.crearActa(data)
  .then(function (res) {
    $ngConfirm({
      content: 'El acta ha sido configurada con éxito',
      title: '',
      type: 'green',
      buttons: {
        Salir: {
          action: function (button, scope) {
            $state.go('configuraciones.compromisos');
          }
        }
      }
    });
  })
  .catch(function (err) {
    $log.log(err);  
    $ngConfirm({
      content: 'Ha ocurrido un error inesperado. Inténtelo nuevamente.',
      title: 'Error',
      type: 'red',
      backgroundDismiss: true
    });
    return '';
  });
}


}]);