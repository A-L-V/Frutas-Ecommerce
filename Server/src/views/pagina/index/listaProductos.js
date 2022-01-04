document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:4000/listaProductos')
        .then((response) => response.json())
        .then((index) => {
            mostrarProductos(index);
        });
});

function mostrarProductos(data) {
    let lsProducto = document.getElementById("lsProducto");
    for (let i = 0; i < data.length; i++) {
        let newProduct = document.createElement("p");
        let pagina = document.createElement("a");
        pagina.setAttribute("href", './paginas/productos/'+data[i].nombre+'.html');
        pagina.innerHTML = "comprar";
        newProduct.innerHTML = data[i].nombre + "," +data[i].precio + "soles, " + data[i].medida + "<br>";
        lsProducto.appendChild(newProduct);
        lsProducto.appendChild(pagina);
        
    }
}