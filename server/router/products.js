import express from 'express'
import multer from 'multer'
const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { addProduct, getAllProducts } from '../services/productServices.js';

router.route('/add-new-product').post(upload.single('productImage'), async (req, res) => {
    if(!req.body.sellerId || req.body.sellerId === "undefined") {
        res.status(200).send({ message: "Can't add new product"});
        return;
    }
    const result = await addProduct(req.body,req.file);
    if(result) res.status(200).send(result);
    else res.status(403).send({message: 'Product not added'});
});

router.route('/fetch-all-product').get((req, res) => {
    res.status(200).send([
        {
            "name": "Apple smart watch",
            "price": "34999",
            "description": "Apple smart watch, long battery life, AI enabled",
        },
        {
            "name": "Smart Phone",
            "price": "15999",
            "description": "Android smart phone",
        },
        {
            "name": "Jeans",
            "price": "999",
            "description": "Tending fashion jeans",
        },
        {
            "name": "Backpack",
            "price": "399",
            "description": "HP laptop bag",
        }
    ])
});

export default router;