
const Request=require("request");

exports.servicioPerfilesUsuario=function(ced){

    //De esta manera consumo el servicio de la API 
    Request.post({
        "headers": { "content-type": "application/json" },
        "url": "http://172.21.0.131:5000/test/consultaperfilesusuario",
        "body": JSON.stringify({
            "cedula": ced
            })
    }, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        console.dir(JSON.parse(body));
    });
}