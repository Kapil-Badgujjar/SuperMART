import express from 'express'
import multer from 'multer'
const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
import { prisma } from '../prisma/prismaClientModule.js';
import { addProduct, getAllProducts, getProductsByCategory, searchProduct } from '../services/productServices.js';
import { getRatingReviews } from '../services/ratingReviewServices.js';

router.route('/add-new-product').post(upload.single('productImage'), async (req, res) => {
    if(!req.body.sellerId || req.body.sellerId === "undefined") {
        res.status(200).send({ message: "Can't add new product"});
        return;
    }
    const result = await addProduct(req.body,req.file);
    if(result) res.status(200).send(result);
    else res.status(403).send({message: 'Product not added'});
});

router.route('/fetch-all-product').get(async (req, res) => {
    const products = await getAllProducts();
    if(products) res.status(200).send(products)
    else res.status(403).send({message: 'Products not found'});
});

router.route('/fetch-product-by-category').post(async (req, res) => {
    if(!req.body.category) return res.status(404).send({message: 'Not found!'});
    const products = await getProductsByCategory(req.body.category);
    if(products) res.status(200).send(products)
    else res.status(403).send({message: 'Products not found'});
});

router.route('/get-product/:id').get( async (req, res) => {
    const id = req.params.id;
    try {
        const product = await prisma.product.findFirst({where: {id: id}});
        if(product) res.status(200).send(product);
    } catch (err) { 
        console.log(err);
        res.status(404).send({message: 'Product not found'});
    }
});

router.route('/search-product').post(async (req, res) => {
    if(!req.body.pattern || req.body.pattern.trim() === "") return res.status(200).send([]);
    const products = await searchProduct(req.body.pattern);
    if(products) res.status(200).send(products)
    else res.status(403).send({message: 'Products not found'});
});

router.route('/get-product-ratings-reviews/:id').get(async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const ratings = await getRatingReviews(id);
        if(ratings){
            res.status(200).send(ratings);
        } else {
            res.status(404).send({message: 'Ratings not found'});
        }
});

export default router;