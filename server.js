const express = require('express');
const { Server: IOServer } = require('socket.io');
const routerProducts = require('./routes/products');
const routerCart = require('./routes/cart');
const app = express();
const PORT = process.env.PORT||8080;

const server = app.listen(PORT, () => {
    console.log('Server listening on: ' + PORT);
});

const io = new IOServer(server);

app.use('/api/product', routerProducts);
app.use('/api/cart', routerCart)
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static(__dirname+'/public'));

app.set('views', './views');
app.set('view engine', 'hbs');

let messages = [];


io.on('connection', socket => {
    console.log("connected client " + socket.id);
    socket.emit('messagelog', messages);
    socket.emit('welcome', 'Welcome to chat with sockets');
    socket.on('message', data => {
        messages.push(data);
        io.emit('messagelog', messages);
    })
})

app.get('/view/products', (req, res) => {
    container.getAll().then(result => {
        let info = result.product;
        let dataObj = {
            products : info
        }
        res.render('products', dataObj)
    })
})

// ROUTER EN PRODUCTOS
/*
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
*/


