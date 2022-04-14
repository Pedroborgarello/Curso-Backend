const express = require("express");
const routerCart = express.Router();

const ContainerCart = require('../classes/containerCart');
const containerCart = new ContainerCart();

routerCart.post('/', (req, res) => {
    let body = req.body;
    containerCart.save(body).then(result => {
        res.send(result.id);
    })
})

routerCart.delete('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    containerCart.deleteById(id).then(result => {
        res.send(result.message);
    })
})

routerCart.get('/:id/products', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    containerCart.getById(id).then(result => {
        res.send(result.products);
    })
})

routerCart.post('/:id/products', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    let body = req.body;
    containerCart.addToCart(id, body).then(result => {
        res.send(result.message);
    })
})

module.exports = { routerCart };
