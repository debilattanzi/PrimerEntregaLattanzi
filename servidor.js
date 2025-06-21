//Desarrollar un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra para tu API.

//Desarrollo del Servidor

//El servidor debe estar basado en Node.js y Express, y debe escuchar en el puerto 8080
//. Se deben disponer dos grupos de rutas: /products
// y /carts
//. Estos endpoints estarán implementados con el router de Express, con las siguientes especificaciones:

const express = require('express');

const server = express();

server.use(express.json());

//Rutas para Manejo de Productos (/api/products/)

//GET /:
//Debe listar todos los productos de la base de datos.

let productos = [
    {
        id: 1,
        nombre: 'iPhone',
        precio: 1000,
        stock: 10
    },
    {
        id: 2,
        nombre: 'Macbook',
        precio: 500,
        stock: 5
    },
    {
        id: 3,
        nombre: 'Laptop',
        precio: 800,
        stock: 8
    },
    {
        id: 4,
        nombre: 'Monitor',
        precio: 200,
        stock: 2
    },
    { 
        id: 5,
        nombre: 'Teclado',
        precio: 50,
        stock: 6
    }
];

server.get('/api/products/', (req, res) => {
    res.json(productos);
});

//GET /:pid:

//Debe traer solo el producto con el id proporcionado.

server.get('/api/products/:pid', (req, res) => {
    const { pid } = req.params;   
    const producto = productos.find(producto => producto.id === parseInt(pid));
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});

//POST /:
//Debe agregar un nuevo producto con los siguientes campos:
//id: Number/String (No se manda desde el body, se autogenera para asegurar que nunca se repitan los ids).
//title: String
// description: String
//code: String
//price: Number
//status: Boolean
//stock: Number
//category: String
//thumbnails: Array de Strings (rutas donde están almacenadas las imágenes del producto).

const siguienteId = productos.length + 1;

server.post('/api/products/', (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || price == null || status == null || stock == null || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Faltan campos obligatorios o tipo incorrecto' });
    }

    const producto = {
        id: siguienteId,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails
    };

    productos.push(producto);
    res.json(producto);
});

//PUT /:pid:
//Debe actualizar un producto por los campos enviados desde el body. No se debe actualizar ni eliminar el id
// al momento de hacer la actualización.

server.put('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productos.find(producto => producto.id === parseInt(pid));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || price == null || status == null || stock == null || !category || !Array.isArray(thumbnails)) {
        return res.status(400).json({ error: 'Faltan campos obligatorios o tipo incorrecto' });
    }

    // Actualizar campos (sin tocar el ID)
    producto.title = title;
    producto.description = description;
    producto.code = code;
    producto.price = price;
    producto.status = status;
    producto.stock = stock;
    producto.category = category;
    producto.thumbnails = thumbnails;

    res.json(producto);
});

//DELETE /:pid:

//Debe eliminar el producto con el pid indicado.

server.delete('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productos.find(producto => producto.id === parseInt(pid));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productos = productos.filter(producto => producto.id !== parseInt(pid));
    res.json({ mensaje: 'Producto eliminado correctamente' });
    producto
});


server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});