const express = require("express");
const router = express.Router();

const Container = require('../classes/container');
const container = new Container();

// RUTAS PRODUCTOS

let administrator = true;

router.get('/', (req, res) => {
    container.getAll().then(result => {
        res.send(result.product);
        console.log(result.product);
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
    if (administrator){
        let body = req.body;
        container.save(body).then(result => {
            res.send(result.id);
        })
    } else {
        return {status: 'error'}
    }
})

router.put('/:id', (req, res) => {
    if (administrator){ 
        let id = req.params.id;
        id = parseInt(id);
        let body = req.body;
        container.upgradeById(id, body).then(result => {
            res.send(result.message);
        })
    } else {
        return {status: 'error'}
    }
})

router.delete('/:id', (req, res) => {
    if (administrator){
        let id = req.params.id;
        id = parseInt(id);
        container.deleteById(id).then(result => {
            res.send(result.message);
        })
    } else {
        return {status: 'error'}
    }
})

module.exports = { router };
