
const express = require('express');

const server = express();

server.use(express.json());



const ProductManager = require('./ProductManager.js');

const productManager = new ProductManager();

server.get('/api/products/', (req, res) => {
    res.json(productManager.getProducts());
});


server.get('/api/products/:pid', (req, res) => {
    const { pid } = req.params; 
    const producto = productManager.getProduct(parseInt(pid));
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

    productManager.addProduct(producto);
    res.json(producto);
});



server.put('/api/products/:pid', (req, res) => {
    const { pid } = req.params;
    const producto = productManager.getProduct(parseInt(pid));

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
    const producto = productManager.getProduct(parseInt(pid));
    

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    productManager.deleteProduct(parseInt(pid));
    res.json({ mensaje: 'Producto eliminado correctamente' });
    producto
});



    const CartManager = require('./CartManager.js');

    const cartManager = new CartManager();

    
    server.post('/api/carts/', (req, res) => {
        const { products } = req.body;
    
        if (!Array.isArray(products)) {
            return res.status(400).json({ error: 'Los productos deben estar en un array' });
        }
    
        const nuevoCarrito = cartManager.addCart(products);
        res.json(nuevoCarrito);
    });
    


    server.get('/api/carts/:cid', (req, res) => {
        const { cid } = req.params;
        const carrito = cartManager.getCart(parseInt(cid));
        
        if (carrito) {
            res.json(carrito);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    });


    server.post('/api/carts/:cid/product/:pid', (req, res) => {
        const { cid, pid } = req.params;

        const carrito = cartManager.getCart(parseInt(cid));

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