const express = require('express');

const Container = require('./container');
const container = new Container();

const app = express();
const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

app.get('/', (req, res) => {
    res.send('<h1>Hola Mundo</h1>');
})

app.get('/products', (req, res) => {
    container.getAll().then(result => {
        res.send(result.product);
    })
})

app.get('/randomProduct', (req, res) => {
    container.getRandom().then(result => {
        res.send(result.product);
    })
})

