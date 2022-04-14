const fs = require('fs');


class Container {
    async save(product){
        try{
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let productId = products.length;
            if (products.some(prod => prod.title.toLowerCase() === product.title.toLowerCase())) {
                return { status: 'error', message: 'the product already exists' }
            } else {
                let dataObj = {
                    id: productId + 1,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail
                }
                products.push(dataObj);
                try {
                    await fs.promises.writeFile('./files/products.txt', JSON.stringify(products, null, 2));
                    return { status: 'success', message: `product successfully, id: ${dataObj.id}`, id: `${dataObj.id}` }
                } catch (err) {
                    return {
                        status: 'error', message: 'the product could not be created:' + err
                    }
                }
            }
        } catch {
            let dataObj = {
                id: 1,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            try {
                await fs.promises.writeFile('./files/products.txt', JSON.stringify([dataObj], null, 2))
                return {
                    status: 'success', message: `product successfully, id: ${dataObj.id}`, id: `${dataObj.id}` }
            } catch (err) {
                return { status: 'error', message: 'the product could not be created:' + err }
            }
        }
    }

    async getById(id){
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let product = products.find(prod => parseInt(prod.id) === parseInt(id));
            if (product) {
                return {product: product}
            } else {
                return { status: 'error', message: 'the product was not found', product: null }
            }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async getAll(){
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            return { product: products }
        } catch (err) {
            return { status: 'error', message: 'no products found' }
        }
    }

    async deleteById(id){
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let product = products.filter(prod => parseInt(prod.id) !== parseInt(id));
            await fs.promises.writeFile('./files/products.txt', JSON.stringify(product, null, 2));
            return { product: product, message: 'product removed successfully' }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async deleteAll(){
        try {
            let deleteAll = [];
            await fs.promises.writeFile('./files/products.txt', JSON.stringify(deleteAll));
            return { message: 'products removed successfully' }
        } catch (err) {
            return { message: 'action could not be completed' }
        }
    }

    async getRandom(){
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let quantityProducts = products.length;
            let randomIndex = Math.floor(Math.random() * quantityProducts);
            let randomProduct = products[randomIndex];
            return { product: randomProduct }
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }

    async upgradeById(id, body){
        let dataObj = {
            id: id,
            title: body.title,
            price: body.price,
            thumbnail: body.thumbnail
        }
        try {
            let data = await fs.promises.readFile('./files/products.txt', 'utf-8');
            let products = JSON.parse(data);
            let product = products.filter(prod => parseInt(prod.id) !== parseInt(id));
            product.push(dataObj);
            await fs.promises.writeFile('./files/products.txt', JSON.stringify(product));
            return { product: product, message: 'product upgrade successfully'}
        } catch (err) {
            return { status: 'error', message: 'the product was not found' }
        }
    }
}

module.exports = Container;




// let product = new Container();

// GUARDA EL PRODUCTO
/*product.save({ title: 'Talleres de Córdoba away', price: 11000, thumbnail: 'https://tienda.clubtalleres.com.ar/wp-content/uploads/2022/02/titular-frente-copia.jpg' }).then(result => {
    console.log(result);
})*/
    
// PASAR UN ID Y DEVUELVE EL PRODUCTO
// product.getById(2).then(result => console.log(result));

// DEVUELVE TODOS LOS PRODUCTOS
// product.getAll().then(result => console.log(result));

// PASAR UN ID Y ELIMINA EL PRODUCTO DEVOLVIENDO LOS RESTANTES
// product.deleteById(2).then(result => console.log(result));

// ELIMINA TODOS LOS PRODUCTOS
// product.deleteAll().then(result => console.log(result));