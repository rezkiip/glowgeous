const express = require('express');
// const Pool = require('pg').Pool;
// const axios = require('axios');

const app = express();
const PORT = 8080;
const API_PATH = '/api/v1';

let products = [
    { id: 1, productName: 'Arsyskin', availableDiscount: false, price: 5000 },
    { id: 2, productName: 'Happyoutiful', availableDiscount: true, price: 10000 }
];

// axios.get('https://shopee.co.id/api/v2/item/get?itemid=7452192420&shopid=37369995')
//     .then(response => console.log(response.data.item.models))
//     .catch(err => console.error(err));

// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'glowgeous',
//     password: 'postgres',
//     port: 5432
// });

app.use(express.json());

// Get Products
app.get(`${API_PATH}/product`, (req, res) => {
    try {
        res.status(202).send(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send([]);
    }
});

// Get Product
app.get(`${API_PATH}/product/:id`, (req, res) => {
    try {
        const id = req.params.id;
        let status = 400;
        let result = {};
        
        for (const product of products) {
            if (product.id == id) {
                status = 202;
                result = product;
                break;
            }
        }
        res.status(status).send(result);
    } catch (err) {
        console.log(err.message);
        res.status(500).send([]);
    }
});

// Create Product
app.post(`${API_PATH}/product`, (req, res) => {
    try {
        const newProduct = req.body;

        products.push(newProduct);
        res.status(202).send(products);
    } catch (err) {
        console.log(err.message);
        res.status(500).send([]);
    }
});

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});