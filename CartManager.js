let carritos = [];

class CartManager {
    constructor() {
        this.carritos = carritos;
        this.nextId = 1; // manejamos el nextId dentro de la clase
    }

    getCarts() {
        return this.carritos;
    }

    getCart(id) {
        return this.carritos.find(carrito => carrito.id === id);
    }

    addCart(products) {
        const nuevoCarrito = {
            id: this.nextId++,
            products
        };
        this.carritos.push(nuevoCarrito);
        return nuevoCarrito;
    }

}

module.exports = CartManager;
