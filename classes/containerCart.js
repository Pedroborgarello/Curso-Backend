const fs = require('fs');

const verificarHora = require('../utils');

class ContainerCart {
    async save(cart){
        try {
            let data = await fs.promises.readFile('./files/cart.txt', 'utf-8');
            let carts = JSON.parse(data);
            let cartId = carts.length;
            if (carts.some(cartsArray => parseInt(cartsArray.id) === parseInt(cart.id))){
                return { status: 'error', message: 'the cart already exists' }
            } else {
                let dataCart = {
                    id: cartId + 1,
                    timestamp: verificarHora,
                    products: cart
                }
                carts.push(dataCart);
                try {
                    await fs.promises.writeFile('./files/cart.txt', JSON.stringify(carts, null,2));
                    return { status: 'success', message: `product successfully, id: ${dataCart.id}`, id: `${dataCart.id}` }
                } catch (err) {
                    return { status: 'error', message: 'the cart could not be created:' + err }
                }
            }
        } catch (err) {
            let dataCart = {
                id: 1,
                timestamp: verificarHora,
                products: cart
            }
            try {
                await fs.promises.writeFile('./files/cart.txt', JSON.stringify([dataCart], null, 2))
                return { status: 'success', message: `cart successfully, id: ${dataCart.id}`, id: `${dataCart.id}` }
            } catch (err) {
                return { status: 'error', message: 'the cart could not be created:' + err }
            }     
        }
    }

    async deleteById(id){
        try {
            let data = await fs.promises.readFile('./files/cart.txt', 'utf-8');
            let carts = Json.parse(data);
            let cart = carts.filter(cartsArray => parseInt(cartsArray.id) !== parseInt(id));
            await fs.promises.writeFile('./files/cart.txt', JSON.stringify(cart, null, 2))
            return { cart: cart, message: 'cart removed successfully' }
        } catch (err) {
            return { status: 'error', message: 'the cart was not found' }
        }
    }

    async getById(id){
        try {
            let data = await fs.promises.readFile('./files/cart.txt', 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(cartsArray => parseInt(cartsArray.id) === parseInt(id));
            if (cart) {
                return { products: cart.products }
            } else {
                return { status: 'error', message: 'the product was not found', product: null }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async addToCart(id, body){
        try {
            let data = await fs.promises.readFile('./files/cart.txt', 'utf-8');
            let carts = JSON.parse(data);
            let cart = carts.find(cartsArray => parseInt(cartsArray.id) === parseInt(id));
            if (cart){
                cart.products += body;
                await fs.promises.writeFile('./files/cart.txt', JSON.stringify(cart))
                return { product: body, message: 'product add to cart'}
            } else {
                return { status: 'error' }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }
}

module.exports = ContainerCart;