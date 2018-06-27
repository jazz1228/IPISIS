var ipisis = angular.module('ipisis');

ipisis.filter('trusted', function($sce){
	return function(html){
	  return $sce.trustAsHtml(html)
	}
});
ipisis.controller('ComiteFormatosController', ['$scope', '$state', '$ngConfirm', '$stateParams', 'SemestreService','InscripcionService','ProfesorService', 'ComiteService',
function($scope, $state, $ngConfirm,$stateParams,SemestreService,InscripcionService ,ProfesorService, ComiteService) {

    $scope.cambiaBoton=$stateParams.cambiaBoton;
  console.log($stateParams);
  
    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    $scope.formato ={
        checkActa:false,
        encabezado: "",
        pie_pagina: "",
        titulo: "",
        numsecciones: "",
        secciones:[
            {
                nombre:"",
                peso:"",
                orden:"",
                guia:""
            }
        ]      

    }     

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

	  $scope.check = function(){
      if($scope.formato.checkActa===true){
        $scope.formato.numsecciones=0;
        $scope.formato.encabezado= `<p style="text-align:center"><span style="color:rgb(0, 0, 0)">
        <strong>DEPARTAMENTO DE INGENIER&Iacute;A DE SISTEMAS</strong></span><br />
        <span style="color:rgb(0, 0, 0)"><strong>FACULTAD DE INGENIER&Iacute;A</strong></span><br /> 
        <span style="color:rgb(0, 0, 0)"><strong>UNIVERSIDAD DE ANTIOQUIA</strong></span></p> <p style="text-align:center">
        <span style="font-size:16px"><span style="color:rgb(0, 0, 0)"><strong>ACTA DE INICIO Y COMPROMISO</strong></span></span><br /> 
        <span style="font-size:16px"><span style="color:rgb(0, 0, 0)"><strong>PROYECTOS INTEGRADORES</strong></span></span></p>`
                
        $scope.formato.pie_pagina= `<p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Mediante la firma del presente documento, el tutor y los estudiantes involucrados en el proyecto nos comprometemos a cumplir cabalmente con los principios acad&eacute;micos del proyecto integrador y el cronograma para su ejecuci&oacute;n y evaluaci&oacute;n, descritos ampliamente en el documento&nbsp;</span></span><u><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;">
        <span style="color:rgb(0, 0, 255)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></u><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">&nbsp;, los cuales se resumen a continuaci&oacute;n:</span></span></p> <p>&nbsp;</p> <ul> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Concretar el concepto de proyecto, es decir, desarrollar un trabajo en el que a) se justifique el estudio o la modificaci&oacute;n, con rigurosidad, de una situaci&oacute;n; b) se establezcan unos objetivos -general y espec&iacute;ficos- a alcanzar; c) se formule un plan de actividades para obtenerlos; d) se definan unos recursos para llevar a cabo las actividades del plan y, e) se precise un m&eacute;todo que valide los logros.</span></span></p> </li> <li> <p style="text-align:justify">
        <span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Aplicar la noci&oacute;n de integraci&oacute;n durante la ejecuci&oacute;n del proyecto, que se debe manifestar como m&iacute;nimo a trav&eacute;s de la confluencia de dos &aacute;reas acad&eacute;micas del programa.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Garantizar la prevalencia del trabajo en equipo para la realizaci&oacute;n de la propuesta y, por ende, de la concreci&oacute;n del concepto de proyecto.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Realizar la socializaci&oacute;n de lo realizado en el proceso y del resultado del proyecto.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Respetar los derechos de propiedad intelectual, dando cr&eacute;dito y referenciando con precisi&oacute;n todos los elementos usados en el proyecto que sean tomados de otras fuentes.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">El tutor del proyecto orientar&aacute; acad&eacute;micamente a los estudiantes, al menos dos horas a la semana, para definir junto con ellos los elementos de la propuesta, evaluar&aacute; continuamente la ejecuci&oacute;n de la misma para asignar las notas de seguimiento, y acompa&ntilde;ar&aacute; la construcci&oacute;n del informe final.</span></span></p> </li> <li> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-size:11pt">Cumplir con los plazos establecidos para cada actividad evaluativa de la asignatura.</span></span></p> </li> </ul> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><strong>Cronograma de evaluaci&oacute;n</strong></span></p> <table border="1" cellpadding="1" cellspacing="1" style="width:700px"> <tbody> <tr> <td style="text-align: center;"><strong><span style="color:rgb(0, 0, 0)">&Iacute;tem</span></strong></td> <td style="text-align: center;"><strong><span style="color:rgb(0, 0, 0)">Fecha o plazo</span></strong></td> <td style="text-align: center;"><strong><span style="color:rgb(0, 0, 0)">Peso</span></strong></td> </tr> <tr> <td style="text-align:justify">
        <span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Acta de inicio y compromiso (semana #2)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">12/02/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><u><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:rgb(0, 0, 255)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></u></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Formalizaci&oacute;n de la propuesta (semana #2)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">23:59 horas, 16/02/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><u><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:rgb(0, 0, 255)"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></u></td> </tr> <tr> <td> <table style="border-collapse:collapse; border-color:initial; border-style:none; border-width:initial"> <tbody> <tr> <td style="vertical-align:top"> <p style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ajustes de Propuestas (semana #4)</span></span></p> </td> <td style="text-align:justify; vertical-align:middle">&nbsp;</td> </tr> </tbody> </table> </td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">02/03/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0)"><span style="font-family:arial; font-size:11pt">Ver&nbsp;</span></span><u><a href="https://docs.google.com/document/d/1OUqpOWpmMXx06YIU8FWuedukedzNAKWE9RhYJpqzjxI/edit?usp=sharing" style="text-align: center; text-decoration-line: none;"><span style="color:#0000FF"><span style="font-family:arial; font-size:11pt">Lineamientos PI 2018-1</span></span></a></u></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #4)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">02/03/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #10)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20/04/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Seguimiento (semana #15)</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">25/05/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Informe final</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">12:00 horas, 25/05/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span></td> </tr> <tr> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">Sustentaci&oacute;n</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">30/05/2018</span></td> <td style="text-align:justify"><span style="color:rgb(0, 0, 0); font-family:arial; font-size:14.6667px">20%</span><br /> &nbsp;</td> </tr> </tbody> </table>`
        
      }else{
        $scope.formato.numsecciones=1;
        $scope.formato.encabezado="";
        $scope.formato.pie_pagina="";
        $scope.formato.checkActa=false;
      }
    }

    $scope.formato = function() {     
      if (!$scope.formatoForm.$valid){
        $ngConfirm({
          title: 'Error',
          content: 'El formato no ha sido creado, por favor verifique los campos obligatorios',
          columnClass: 's',
          type: 'red',
          scope: $scope,
          buttons: {
            Salir: {
              btnClass: 'btn-red',
              action: function (scope, button) {
              }
            }
          }
        });
        return;
      }
      
      let val=Object.keys($scope.formato.secciones).length
      if (val>0){
        let total=0;
        for(let i=0;i<val;i++){          
          total=total+$scope.formato.secciones[i].peso;
        }                
        if(total>0 && total<100){
          $ngConfirm({
            title: 'Error',
            content: 'El peso de las secciones deben de sumar 100% (cien porciento) o 0% (cero porciento), y estas solo suman: '+total+'%',
            columnClass: 's',
            type: 'red',
            scope: $scope,
            buttons: {
              Salir: {
                btnClass: 'btn-red',
                action: function (scope, button) {
                }
              }
            }
          });
          return;
        }
      }
      if($scope.formato.numsecciones===0 && $scope.formato.checkActa!=true){
        $ngConfirm({
          title: 'Error',
          content: 'Todo formato debe incluir como mínimo una sección',
          columnClass: 's',
          type: 'red',
          scope: $scope,
          buttons: {
            Salir: {
              btnClass: 'btn-red',
              action: function (scope, button) {
              }
            }
          }
        });
        return;
      }

      let section=[];
      for(let i=0;i<$scope.formato.numsecciones;i++){
        section[i]=$scope.formato.secciones[i]
        section[i].orden=i;
      }
      if($scope.formato.checkActa){
        section=[];
        let data = {
          orden:0,
          nombre: 'Terminos',
          guia:'Yo como estudiante me comprometo a cumplir con los compromisos de Proyecto Integrador.',
          peso:0
        }
        section.push(data);
      }
     
      if($stateParams.cambiaBoton==='Y'){
        let agregados=$stateParams.compromiso;
        let credenciales={
          titulo_formato: $scope.formato.titulo,
          encabezado: $scope.formato.encabezado,
          pie_pagina: $scope.formato.pie_pagina,
          checkActa: $scope.formato.checkActa,
          fecha_creacion : new Date(),
          secciones:section,
          fechaEquipo:agregados.fechaEquipo,
          fechaTutor:agregados.fechaTutor,
          materia_id:agregados.materia_id,
          semestre_id:agregados.semestre_id,
          titulo:agregados.titulo,
          calificable:agregados.calificable,
          porcentaje:agregados.porcentaje,
          descripcion:agregados.descripcion,
          completaEquipo:agregados.completaEquipo,
          completaTutor:agregados.completaTutor,
          adjunto:agregados.adjunto,
          porcentaje:agregados.porcentaje,
          anexos : agregados.anexos
        }
        console.log(credenciales);
        
        var data = new FormData();
        data.append("titulo", credenciales.titulo);
        data.append("descripcion", credenciales.descripcion);
        data.append("encabezado", credenciales.encabezado);
        data.append("piePagina", credenciales.pie_pagina);
        data.append("tipoActa", credenciales.checkActa);
        data.append("porcentaje", credenciales.porcentaje);
        data.append("completaEquipo", credenciales.completaEquipo);
        data.append("fechaEquipo",credenciales.fechaEquipo);
        data.append("adjunto", credenciales.adjunto);
        data.append("completaTutor", credenciales.completaTutor);
        data.append("fechaTutor", credenciales.fechaTutor);
        data.append("calificable", credenciales.calificable);
        data.append("materia_id", credenciales.materia_id);
        data.append("semestre_id", credenciales.semestre_id);
        data.append("titulo_formato", credenciales.titulo_formato);
        data.append("fecha_creacion", credenciales.fecha_creacion);
        data.append("secciones", JSON.stringify(credenciales.secciones));
        for (var i in $scope.files) {
          data.append("anexos", credenciales.anexos[i]);
        }
        crear(data);
      }else{
        if($scope.formato.checkActa!=true){
          $scope.formato.checkActa=false;
        }
        let credenciales={
          titulo_formato: $scope.formato.titulo,
          encabezado: $scope.formato.encabezado,
          piePagina: $scope.formato.pie_pagina,
          tipoActa: $scope.formato.checkActa,
          fecha_creacion : new Date(),
          secciones:section
        }
        
        ComiteService.crearFormato(credenciales).
          then(function(record){
            $ngConfirm({
              title: 'Formato creado',
              content: 'El formato ha sido creado correctamente.',
              columnClass: 's',
              type: 'green',
              scope: $scope,
              buttons: {
                Salir: {
                  btnClass: 'btn-green',
                  action: function (scope, button) {
                    $scope.cargarPagina();
                  }
                }
              }
            });
          }).catch(function(err) {
            $ngConfirm({
              title: 'Error',
              content: 'El formato no ha sido creado, por favor verifique los campos obligatorios',
              columnClass: 's',
              type: 'red',
              scope: $scope,
              buttons: {
                Salir: {
                  btnClass: 'btn-red',
                  action: function (scope, button) {
                  }
                }
              }
            });
          })
        };
      }
      function crear(data) {
        ComiteService.crearCompromisoYFormato(data) 
        .then(function (res) {
          $ngConfirm({
            content: 'El compromiso ha sido creado.',
            title: '',
            type: 'green',
            buttons: {
              Salir: {
                action: function (button, scope) {
                    $state.go('configuraciones.compromisos')
                }
              }
            }
          });
        })
        .catch(function (err) {
          console.log(err);
          if (err.data.code) {
            if (err.data.code == 1) {
              $ngConfirm({
                content: err.data.msg,
                title: 'Error',
                type: 'red',
                backgroundDismiss: true
              }); 
            }         
          } else {
            $ngConfirm({
              content: 'El compromiso ha sido creado.',
              title: '',
              type: 'green',
              backgroundDismiss: true
            });
          }
          return ''; 
        });
      }

    $scope.cargarPagina = function () {
      $state.reload();
    }

    $scope.classValidacion = function (formToVal, nombre) {
      var form = formToVal;
      if(!form[nombre]){
        return 
      }
      if (form[nombre].$invalid && (!form.$pristine || form.$submitted || form[nombre].$touched)) {
        return ['has-error'];
      }
      else if (form[nombre].$valid) {
        return ['has-success'];
      }
    }
  
    $scope.inputValidacion = function (formToVal, nombre) {
      var form = formToVal;
      if(!form[nombre]){
        return
      }
      return form[nombre].$error
    }

    $scope.mostrarValidacion = function (formToVal, nombre) {
      var form = formToVal;      
      if(!form[nombre]){
        return
      }
      return form[nombre].$touched || form.$submitted
    }
    $scope.cambioArriba=function(posicion){
      if(posicion===0){
        return
      }
      let control =$scope.formato.secciones[posicion-1]
      $scope.formato.secciones[posicion-1]= $scope.formato.secciones[posicion]
      $scope.formato.secciones[posicion]= control
    }
    $scope.cambioAbajo =function(posicion){      
      if(posicion===(Object.keys($scope.formato.secciones).length)-1){
        return
      }
      let control =$scope.formato.secciones[posicion+1]
      $scope.formato.secciones[posicion+1]= $scope.formato.secciones[posicion]
      $scope.formato.secciones[posicion]= control      
    }  
    
}]);
