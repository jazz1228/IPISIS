/**
 * ActaInicioController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const fs = require('fs');
module.exports = {
  
    saveFile: function(req,res){
        let encabezado = null;
        let contenido = null;
        let piePagina = null;
        let path = null;
        let steam = null;

        encabezado = req.param('encabezado');
        if (!encabezado || encabezado=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el encabezado del acta de inicio'});
        }
        contenido = req.param('contenido');
        if (!contenido || contenido=== 'null') {
            return res.badRequest({code:1, msg: 'Se debe ingresar el contenido del acta de inicio'});
        }
        piePagina = req.param('piePagina');
        if (!piePagina || piePagina=== 'null') {
            piePagina = '';
        }

        path= process.cwd() +  `/assets/`;
      
        async.parallel([
            function(callback){ 
                fs.writeFile(path+"encabezadoActa.txt",encabezado,callback);
            },
            function(callback){
                fs.writeFile(path+"textoActa.txt",contenido+piePagina,callback);
            }
        ],
        function(err, results){
            if (err) {
                return res.serverError();
            }
            return res.ok();
        });
    },

    writeFile: function (req,res) {
        let formatoActa = null;
        let path = null;
        let file1= null;
        let file2= null;

        path= process.cwd() +  `/assets/`;
        file1= path+"encabezadoActa.txt";
        file2= path+"textoActa.txt";
        function readTwoFiles(file1, file2, callback) {
            async.parallel([
                fs.readFile.bind(fs, file1),
                fs.readFile.bind(fs, file2),
            ], callback);
        }
        readTwoFiles(file1, file2, function(err, files) {
            if(err){
                return res.serverError();
            }
            formatoActa ={
                encabezado: files[0],
                contenido: files[1]
            }
            return res.ok(formatoActa);
        })
       
    }
};

