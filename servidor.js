
const express = require('express');

const server = express();

server.use(express.json());



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


server.get('/api/products/:pid', (req, res) => {
    const { pid } = req.params;   
    const producto = productos.find(producto => producto.id === parseInt(pid));
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).json({ error: 'Producto no encontrado' });
    }
});



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

    
    let carritos = [];
    let nextId = 1;

    server.post('/api/carts/', (req, res) => {
        const { products } = req.body;

        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Los productos deben estar en un array' });
        }
        const carrito = {
            id: nextId++,
            products
        };
        carritos.push(carrito);
        res.json(carrito);
    });



    server.get('/api/carts/:cid', (req, res) => {
        const { cid } = req.params;
        const carrito = carritos.find(carrito => carrito.id === parseInt(cid));
        if (carrito) {
            res.json(carrito);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    });

    //    POST /:cid/product/:pid:
//Debe agregar el producto al arreglo products 
//del carrito seleccionado, utilizando el siguiente formato:

//product: Solo debe contener el ID del producto.

//quantity: Debe contener el número de ejemplares de dicho producto (se agregará de uno en uno).

//Si un producto ya existente intenta agregarse, se debe incrementar el campo quantity
//de dicho producto.

    server.post('/api/carts/:cid/product/:pid', (req, res) => {
        const { cid, pid } = req.params;

        const carrito = carritos.find(carrito => carrito.id === parseInt(cid));
        if (!carrito) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }

        const productoEnCarrito = carrito.products.find(p => p.id === parseInt(pid));

        if (productoEnCarrito) {
            productoEnCarrito.quantity += 1;
        } else {
            carrito.products.push({
                id: parseInt(pid),
                quantity: 1
            });
        }

        res.json(carrito);
    });



server.listen(8080, () => {
    console.log('Servidor corriendo en el puerto 8080');
});