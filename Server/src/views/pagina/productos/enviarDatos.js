
document.addEventListener('DOMContentLoaded', function () {
    let file= fileName();
    fetch('http://localhost:4000/buscarProducto/' + file)
        .then((response) => response.json())
        .then((index) => {
            completarDatos(index);
            let id = document.getElementById("id");
            id.setAttribute('value', index[0].id);
        });
});

function completarDatos(data){
    let pushDatos = document.getElementsByClassName("datos");
    pushDatos[0].innerHTML += data[0].precio;
    pushDatos[1].innerHTML += data[0].medida;
    pushDatos[2].innerHTML += data[0].nombre + data[0].precioEnvase;
}

function fileName(){
    var rutaAbsoluta = self.location.href;   
    var posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    var rutaRelativa = rutaAbsoluta.substring( posicionUltimaBarra + "/".length , rutaAbsoluta.length );
    var nombreArchivo = rutaRelativa.substring(0,rutaRelativa.length -5);
    return nombreArchivo;  
}
