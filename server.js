const express = require('express');
const fs = require('fs');
const server = express();
const ArchivoFS = require('./productos');

const PORT = 8080
async function cargarTxt(){
    try {
        const productos = await new ArchivoFS('./producto.txt')
        // console.log(productos)
        productos.save('Iphone 11',45200,'https://www.casanissei.com/media/catalog/product/cache/16a9529cefd63504739dab4fc3414065/1/1/11_negrooo_9.jpg')
        productos.save('Game Boy Color',11231,'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Nintendo-Game-Boy-Color-FL.jpg/300px-Nintendo-Game-Boy-Color-FL.jpg')
        productos.save('Gallina',2015436,'https://pbs.twimg.com/media/EKaEW7AW4AEHg-q?format=jpg&name=small')
        leerJson()
    }
    catch(error){
        console.log('error de lectura',error);

    }
}
async function leerJson () {
    try{
        const contenido = await new ArchivoFS('./productList.json')
            // console.log(contenido.length());
            const listado = contenido.getAll();

            server.get('/', (solicitud, respuesta, siguiente)=> {
                respuesta.send('<h1 style="color:blue">Bienvenido al Desafio de la Clase 6</h1>')
            });
            server.get('/productos', (solicitud, respuesta, siguiente)=> {
                respuesta.send(contenido.getAll())
            });
            server.get('/productoRandom', (solicitud, respuesta, siguiente)=> {
                const maximo = listado.length;
                idRandom = Math.floor(Math.random()*(maximo))+1;


                respuesta.send(contenido.getById(idRandom))
            });

            server.listen(PORT,()=>{
                console.log(`Servidor corriendo en el puerto: ${PORT}`);
            })

            server.on('error', (error) => console.log(`Error en servidor ${error}`));
    }
    catch(error){
        console.log('error de lectura',error);
    }
}

cargarTxt()


// server.get('/visitas', (solicitud, respuesta, siguiente)=> {
    
// });

// server.get('/fyh', (solicitud, respuesta, siguiente)=> {
//     const date = new Date().toLocaleString();
//     respuesta.json({fyh: date})
//     // respuesta.send({fyh: today.format('L LTS')})

// });


