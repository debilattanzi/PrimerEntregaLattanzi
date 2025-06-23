const fs = require('fs');

const ruteo = './carts.json';



class CartManager {
    constructor() {
        this.ruteo = ruteo;
        this.carritos = this.leerCarritos();
        this.nextId = this.carritos.length > 0 ? this.carritos[this.carritos.length - 1].id + 1 : 1;

    }

    leerCarritos() {
        try {
            const data = fs.readFileSync(this.ruteo, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error cargando carritos:', error);
            return [];
        }
    }

    guardarCarritos() {
        fs.writeFileSync(this.ruteo, JSON.stringify(this.carritos, null, 2));
    }

    getCarritos() {
        return this.carritos.map(c => ({ ...c, products: c.products.map(p => ({ ...p, product: this.productManager.getProduct(p.id) })) }));
    }

    getCarts() {
        return this.carritos;
    }

    getCart(id) {
        return this.carritos.find(c => c.id === parseInt(id));
    }

    addCart(products) {
        const newId = this.carritos.length > 0 ? this.carritos[this.carritos.length - 1].id + 1 : 1;
        const nuevoCarrito = { id: newId, products };
        this.carritos.push(nuevoCarrito);
        this.guardarCarritos();
        return nuevoCarrito;
    }

    updateCart(id, updatedFields) {
        const index = this.carritos.findIndex(c => c.id === id);
        if (index !== -1) {
            this.carritos[index] = { ...this.carritos[index], ...updatedFields, id }; 
            this.guardarCarritos();
            return this.carritos[index];
        }
        return null;
    }

}

module.exports = CartManager;
