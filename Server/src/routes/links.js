const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req,res)=>{
    const consulta = await db.query("SELECT id_product,price, unity FROM product;");
    res.render("./pagina/index/index.hbs", { consulta} );
});

router.post('/producto',async (req,res)=>{
    const {id} = req.params;
    const consulta = await db.query("select P.id,P.nombre,P.precio, P.medida, E.nombre, E.precio as precioEnvase FROM Producto P inner join Envase E WHERE P.id_Envase=E.id and P.id =?;",[id]);
    res.render("./pagina/productos/producto.hbs", {consulta});
});


router.get('/carrito/',async (req,res)=>{
    const query = await db.query("select nombre, precio, medida, cantidad from Carrito C inner join Producto P on P.id=C.id_Producto;");
    
});

router.post('/carrito', async(req,res)=>{
    const { cliente, producto, cantidad} = req.body;
    const query = await db.query("CALL upCarrito(?,?,?)", [cliente,producto,cantidad]);
});


module.exports =router;