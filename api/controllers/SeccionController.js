/**
 * SeccionController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
create: function (req, res) {
    let orden = null;
    let nombre = null;
    let contenido = null;
    let peso = null;
    let seccion= null;

    orden = req.param('orden');
    if (!orden) {
        return res.badRequest({code:1, msg: 'Se debe ingresar el orden de la sección'});
    }

    nombre = req.param('nombre');
    if (!nombre) {
        return res.badRequest({code:1, msg: 'Se debe ingresar el nombre de la sección'});
    }

    contenido = req.param('contenido');
    if (!contenido) {
        return res.badRequest({code:1, msg: 'Se debe ingresar el contenido de la sección'});
    }

    peso = req.param('peso');
    if (!peso) {
       peso =  0.00
    }
    
    
    seccion = {
        orden: orden,
        nombre: nombre,
        contenido: contenido,
        peso: peso  
    }
  
    return Seccion.create(seccion).then(seccion => {  
            return res.created();
        }).catch(err => {
            return res.serverError(err);
    });
        
    
}


};

