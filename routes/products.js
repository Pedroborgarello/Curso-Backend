const express = require("express");
const router = express.Router();

const Container = require('../classes/container');
const container = new Container();

router.get('/', (req, res) => {
    container.getAll().then(result => {
        res.send(result.product);
    })
})

router.get('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    container.getById(id).then(result => {
        res.send(result.product);
    })
})

router.post('/', (req, res) => {
    let body = req.body;
    container.save(body).then(result => {
        res.send(result.id);
    })
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    let body = req.body;
    container.upgradeById(id, body).then(result => {
        res.send(result.message);
    })
})

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    container.deleteById(id).then(result => {
        res.send(result.message);
    })
})

export default router;