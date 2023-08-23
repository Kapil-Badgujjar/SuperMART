import express from 'express'
import { addSeller, getSeller } from '../services/sellerServices.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
const router = express.Router()
import {} from 'dotenv/config'
import authenticateSeller from '../middlewares/authMiddlewareSeller.js'
import { prisma } from '../prisma/prismaClientModule.js'
import { testEmail, testPassword, testPhoneNumber } from '../utils/dataValidator.js'

router.route('/get-seller-details').get( authenticateSeller, async (req, res)=> {
    console.log(req.seller)
    res.status(200).send(req.seller);
});

router.route('/refresh-token').get(async (req, res)=> {
    const refreshToken = req.headers['authorization'].split(' ')[1];
    if(!refreshToken) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }
    const response = await prisma.token.findFirst({where: {refreshToken: refreshToken}})
    if(response){
        const data = jwt.verify(token, process.env.SELLER_REFRESH_TOKEN_SECRET);
        const seller = {
            id: data.id,
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber
        }
        console.log(seller,  ' --- refresh token');
        const newAccessToken = jwt.sign(seller, process.env.SELLER_ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
        res.status(200).json({seller, newAccessToken});
    } else{  //else send error
        res.status(403).send({message: 'No account found'});
    }
});
router.route('/login').post(async (req,res)=>{
    console.log(req.body);
    if(!req.body.email || !req.body.password) res.status(403).send({"message": "email/password empty"});
    try{
        const response = await getSeller(req.body.email, req.body.password);
        const seller = {
            id: response.id,
            name: response.name,
            email: response.email,
            phoneNumber: response.phoneNumber
        }
        if(seller){
            console.log(seller, ' --- login');
            const accessToken = jwt.sign(seller, process.env.SELLER_ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
            const refreshToken = jwt.sign(seller, process.env.SELLER_REFRESH_TOKEN_SECRET);
            const response = await prisma.token.create({data: {refreshToken: refreshToken}});
            if(response) res.status(200).send({seller, accessToken, refreshToken});
            else res.status(500).send({message: error.message});
        }else{  //else send error
            res.status(403).send({message: 'No account found'});
        }
    } catch( error){
        res.status(500).send({message: error.message});
    }   
})

router.route('/logout').get(async (req,res) => {
    const refreshToken = req.headers['authorization'].split(' ')[1];
    if(!refreshToken) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }
    prisma.token.delete({where: { refreshToken: refreshToken}})
    res.status(200).send({'message': 'Token has been deleted'});
});

router.route('/register').post( async (req, res) => { 
    if(!req.body) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }
    console.log(req.body);
    if(!req.body.name){
        res.status(200).send({isValid: false, message: 'Please enter a name'});
        return;
    } else if(!testPhoneNumber(req.body.phoneNumber)){
        res.status(200).send({isValid: false, message: 'Please enter phone number'});
        return;
    }else if(!testEmail(req.body.email)){
        res.status(200).send({isValid: false, message: 'Please enter valid email address'});
        return;
    }else if(!testPassword(req.body.password)){
        res.status(200).send({isValid: false, message: 'Enter a strong password [a-zA-Z0-9$!@#..'});
        return;
    }

    console.log('\n-----New Seller Details-----\n',req.body,'\n');
    const seller = {
        ...req.body,
        "isActive": true,
        "isBlocked": false,
        "passwordUpdateToken": uuidv4(),
    }
    const response = await addSeller( seller);
    if(response) res.status(200).send({isValid: true, message: 'Done'});
    else res.status(500).send({ message: 'server error' });
})

router.route('/get-my-products').get(authenticateSeller, async (req, res) => {
    try {
        const response = await prisma.product.findMany({ where: { sellerId: req.seller.id}});
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send({ message: 'server error' });
    }
});

router.route('/get-my-orders').get( authenticateSeller, async (req, res) => {
    try {
        const response = await prisma.order.findMany({ where: { sellerId: req.seller.id}});
        res.status(200).send(response);
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'server error' });
    }
});

export default router;