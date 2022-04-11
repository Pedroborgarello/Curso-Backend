const express = require("express");
const router = express.Router();

const ContainerCart = require('./classes/ContainerCart');
const containerCart = new ContainerCart();

router.post('/', (req, res) => {
    let body = req.body;
    containerCart.save(body).then(result => {
        res.send(result.id);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    containerCart.deleteById(id).then(result => {
        res.send(result.message);
    })
})

router.get('/:id/products', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    containerCart.getById(id).then(result => {
        res.send(result.products);
    })
})

router.post('/:id/products', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    let body = req.body;
    containerCart.addToCart(id, body).then(result => {
        res.send(result.message);
    })
})

export default router;
