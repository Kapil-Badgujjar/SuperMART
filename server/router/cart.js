import express from 'express'
const router = express.Router()
import authenticateUser from '../middlewares/authMiddlewareUser.js';
import { addProduct, removeProduct, getCartData, updateCartItemQuantity} from '../services/cartServices.js';

router.route('/get-cart').get( authenticateUser, async (req, res) => {
    const data = await getCartData(req.user.id);
    if(data){
        res.status(200).send(data);
    } else {
        res.status(404).send({message: 'Cart not found'});
    }
});

router.route('/add-to-cart').post( authenticateUser, async (req, res) => {
    const flag = await addProduct(req.body);
    if(flag) res.status(200).send({message: 'success'});
    else res.status(404).send({message: 'failed to add'});
});

router.route('/remove-product').post( authenticateUser, async (req, res) => {
    try {
        removeProduct(req.body.item, req.user.id)
        res.status(200).send({message: 'Success'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: 'Internal Server Error'});
    }
});

router.route('/update-cart').post( authenticateUser, async (req, res) => {
    const response = await updateCartItemQuantity(req.body.item, req.body.quantity, req.user.id)
    if(response) res.status(200).send({message: 'Successful'});
    else res.status(500).send({message: 'failed to update quantity'});
});

export default router;