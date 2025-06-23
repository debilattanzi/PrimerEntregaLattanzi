const fs = require('fs');
const ruta = './productos.json';

class ProductManager {
    constructor() {
        this.ruta = ruta;
        this.productos = this.leerProductos();
    }

    leerProductos() {
        try {
            const data = fs.readFileSync(this.ruta, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error cargando productos:', error);
            return [];
        }
    }

    guardarProductos() {
        fs.writeFileSync(this.ruta, JSON.stringify(this.productos, null, 2));
    }

    getProducts() {
        return this.productos;
    }

    getProduct(id) {
        return this.productos.find(p => p.id === id);
    }

    addProduct(producto) {
        const newId = this.productos.length > 0 ? this.productos[this.productos.length - 1].id + 1 : 1;
        const nuevoProducto = { id: newId, ...producto };
        this.productos.push(nuevoProducto);
        this.guardarProductos();
        return nuevoProducto;
    }

    deleteProduct(id) {
        this.productos = this.productos.filter(p => p.id !== id);
        this.guardarProductos();
    }

    updateProduct(id, updatedFields) {
        const index = this.productos.findIndex(p => p.id === id);
        if (index !== -1) {
            this.productos[index] = { ...this.productos[index], ...updatedFields, id }; 
            this.guardarProductos();
            return this.productos[index];
        }
        return null;
    }
}

module.exports = ProductManager;
