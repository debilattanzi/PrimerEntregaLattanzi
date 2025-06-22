import productos from './productos.json';


class ProductManager {
    constructor() {
        this.productos = productos;
    }

    getProducts() {
        return this.productos;
    }

    getProduct(id) {
        return this.productos.find(producto => producto.id === id);
    }

    addProduct(producto) {
        this.productos.push(producto);
    }

    deleteProduct(id) {
        this.productos = this.productos.filter(producto => producto.id !== id);
    }
}

module.exports = ProductManager;