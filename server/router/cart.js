import express from 'express'
const router = express.Router()

router.route('/get-cart').get((req, res) => {
    res.status(200).send([
        {
        "productId": '01',
        "name": "Apple smart watch",
        "price": "34999",
        "description": "Apple smart watch, long battery life, AI enabled",
        "image": "https://m.media-amazon.com/images/I/51V9K7WHEHL._UX679_.jpg",
        "quantity": "5"
        },
        {
        "productId": '02',
        "name": "Smart Phone",
        "price": "15999",
        "description": "Android smart phone",
        "image": "https://m.media-amazon.com/images/I/51V9K7WHEHL._UX679_.jpg",
        "quantity": "2"
        },
        {
        "productId": '03',
        "name": "Jeans",
        "price": "999",
        "description": "Tending fashion jeans",
        "image": "https://m.media-amazon.com/images/I/51V9K7WHEHL._UX679_.jpg",
        "quantity": "1"
        },
        {
        "productId": '04',
        "name": "Backpack",
        "price": "399",
        "description": "HP laptop bag",
        "image": "https://m.media-amazon.com/images/I/51V9K7WHEHL._UX679_.jpg",
        "quantity": "10"
        }
    ])
});

router.route('/add-to-cart').post((req, res) => {
    console.log(req.body);
});

export default router;