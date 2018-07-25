var ipisis = angular.module('ipisis');

ipisis.config(['$stateProvider', '$urlRouterProvider', 'ROLES',
function($stateProvider, $urlRouterProvider, ROLES){

	/**
	*  RUTAS DE ACCESO GLOBAL.
	*/
	$stateProvider
	.state("home", {
		url: "/",
		templateUrl: "templates/public/home.html"
	})
	.state("signin", {
		url: "/signin",
		templateUrl: "templates/public/signin.html",
		controller: "SigninController",
		data: {
			permissions: {
				only: ROLES.ANON,
				redirectTo: 'home'
			}
		}
	})
	.state("listaIdeas", {
		url: "/lista-ideas",
		templateUrl: "templates/public/lista-ideas.html",
		controller: "ListaIdeasController"
	})
	.state("listaOfertas", {
		url: "/lista-ofertas",
		templateUrl: 'templates/public/lista-oferta.html',
		controller: "ListaOfertasController"
	});

	/**
	* RUTAS DE ACCESO DE UN ESTUDIANTE.
	*/
	$stateProvider
	.state("estudiante", {
		url: "/estudiante",
		templateUrl: "templates/private/estudiante/index.html",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipos", {
		url: "/equipos",
		templateUrl: "templates/private/estudiante/equipos.html",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipos.lista", {
		url: "/lista",
		templateUrl: "templates/private/estudiante/lista-equipos.html",
		controller: 'ListaEquiposController',
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipos.crear", {
		url: "/crear",
		templateUrl: "templates/private/estudiante/crear-equipo.html",
		controller: 'CrearEquipoController',
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo", {
		url: "/equipo",
		templateUrl: "templates/private/equipo/equipo.html",
		controller: 'EquipoController',
		params: {equipo: null},
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})

	.state("equipo.preinscripcion", {
		url: "/preinscripcion",
		templateUrl: "templates/private/equipo/preinscripcion.html",
		controller: "PreinscripcionController",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo.inscripcion", {
		url: "/inscripcion",
		templateUrl: "templates/private/equipo/inscripcion.html",
		controller: "InscripcionController",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo.inscripciones", {
		url: "/inscripciones",
		templateUrl: "templates/private/equipo/inscripciones.html",
		controller: "InscripcionesController",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo.informacion", {
		url: "/informacion",
		templateUrl: "templates/private/equipo/informacion.html",
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo.listar-bitacora", {
        url: "/proyecto/listar-bitacora",
        templateUrl: "templates/private/equipo/listar-bitacora.html",
		controller: "ListarBitacoraController",
		params: {equipo: null},
        data: {
            permissions: {
                only: ROLES.ESTUDIANTE,
                except: ROLES.ANON,
                redirectTo: 'signin'
            }
        }
    })
	.state("equipo.crearBitacora", {
        url: "/proyecto/crearBitacora",
        templateUrl: "templates/private/equipo/crearBitacora.html",
		controller: "BitacoraController",
		params: {equipo: null, bitacora:null ,modo:'CREAR'},
        data: {
            permissions: {
                only: ROLES.ESTUDIANTE,
                except: ROLES.ANON,
                redirectTo: 'signin'
            }
        }
    })
	.state("equipo.proyecto", {
		url: "/proyecto",
		templateUrl: "templates/private/equipo/proyecto.html",
		controller: "ListarBitacoraController",
		params: {equipo: null},
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("equipo.compromiso", { 
		url: "/compromisos",
		templateUrl: "templates/private/equipo/compromisos.html",
		controller: "CompromisosEquipoController",
		params: {equipo: null},
		data: {
			permissions: {
				only: ROLES.ESTUDIANTE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	});

	/**
	* RUTAS DE ACCESO DE UN PROFESOR.
	*/
	$stateProvider
	.state("profesor", {
		url: "/profesor",
		templateUrl: "templates/private/profesor/index.html",
		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("crearIdea", {
		url: "/crear-idea",
		templateUrl: "templates/private/profesor/crear-idea.html",
		controller: "CrearIdeaController",
		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("listaProyectos", {
		url: "/listaProyectos",
		templateUrl: "templates/private/profesor/listaProyectos.html",
		controller: "listaProyectosController",
		params: {profesor: null},
		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("proyecto", {
		url: "/tutor-proyecto",
		templateUrl: "templates/private/profesor/proyectoProfesor.html",
		controller: "ListarBitacoraProfesorController",
		params: {equipo: null, proyecto:null},
		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("profesor-listar-bitacora", {
    	url: "/profesor/listar-bitacora",
    	templateUrl: "templates/private/equipo/listar-bitacora.html",
		controller: "ListarBitacoraProfesorController",
		params: {equipo: null, proyecto:null},
        data: {
            permissions: {
                only: ROLES.PROFESOR,
                except: ROLES.ANON,
                redirectTo: 'signin'
            }
        }
	})
	.state("crearBitacoraP", {
    	url: "/profesor/crearBitacoraP",
        templateUrl: "templates/private/equipo/crearBitacora.html",
		controller: "BitacoraController",
		params: {equipo: null, bitacora:null,profesor:null ,modo:'CREAR', proyecto:null},
        data: {
            permissions: {
                only: ROLES.PROFESOR,
                except: ROLES.ANON,
                redirectTo: 'signin'
            }
        }
	})
	.state("compromiso", { 
		url: "/compromisos",
		templateUrl: "templates/private/equipo/compromisos.html",
		controller: "CompromisosEquipoController",
		params: {equipo: null,profesor:null},
		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("misIdeas", {
		url: "/mis-ideas",
		templateUrl: "templates/private/profesor/mis-ideas.html",
		controller: "MisIdeasController",

		data: {
			permissions: {
				only: ROLES.PROFESOR,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	});

	/**
	*  RUTAS DE ACCESO DEL COMITÉ
	*/
	$stateProvider
	.state("comite", {
		url: "/comite",
		templateUrl: "templates/private/comite/index.html",
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("propuestasIdea",{
		url: "/propuestas-ideas",
		templateUrl: "templates/private/comite/propuestas-ideas.html",
		controller: 'PropuestasIdeaController',
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("configuraciones",{
		url: "/configuraciones",
		templateUrl: "templates/private/comite/configuraciones.html",
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("configuraciones.compromisos",{
		url: "/comite-compromisos",
		templateUrl: "templates/private/comite/compromisos.html",
		controller: 'ComiteCompromisosController',
		params: {modo: 'CREAR', formato:""},
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("configuraciones.formatos",{
		url: "/comite-formatos",
		templateUrl: "templates/private/comite/formatos.html",
		controller: 'ComiteFormatosController',
		params: {compromiso:"",cambiaBoton:'N'},
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("extensiones",{
		url: "/extensiones",
		templateUrl: "templates/private/comite/grupos.html",
		controller: 'ComiteGruposController',
		data: {
			permissions: {
				only: ROLES.COMITE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	});
	/**
	* RUTAS DE ACCESO DEL JEFE
	*/
	$stateProvider
	.state("jefe", {
		url: "/jefe",
		templateUrl: "templates/private/jefe/index.html",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("semestres", {
		url: "/semestres",
		templateUrl: "templates/private/jefe/semestres.html",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("semestres.crear", {
		url: "/crear",
		templateUrl: "templates/private/jefe/crear-semestre.html",
		controller: "CrearSemestreController",
		params: {semestre: null, modo: 'CREAR'},
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("semestres.lista", {
		url: "/lista",
		templateUrl: "templates/private/jefe/lista-semestre.html",
		controller: "ListaSemestreController",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("listaProfesores", {
		url: "/lista-profesores",
		templateUrl: "templates/private/jefe/lista-profesores.html",
		controller: "ListaProfesoresController",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("ofertarIdeas",{
		url: "/ofertar-ideas",
		templateUrl: "templates/private/jefe/ofertar-ideas.html",
		controller: "OfertarIdeasController",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("solicitudInscripcion", {
		url: "/solicitud-inscripcion",
		templateUrl: "templates/private/jefe/solicitud-inscripcion.html",
		controller: "SolicitudInscripcionController",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	})
	.state("generarReporte",{
		url:"/generar-reporte",
		templateUrl: "templates/private/jefe/reporte.html",
		controller:"GenerarReporteController",
		data: {
			permissions: {
				only: ROLES.JEFE,
				except: ROLES.ANON,
				redirectTo: 'signin'
			}
		}
	});

	$urlRouterProvider.otherwise('/');
}]);
