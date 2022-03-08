const express = require('express');
const app = express();
const PORT = process.env.PORT||8080;

const router = express.Router();
router.use(express.urlencoded({ extended: true}));
router.use(express.json());

const server = app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

app.use(express.static('public'));

const Container = require('./container');
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

app.use('/api/product', router);