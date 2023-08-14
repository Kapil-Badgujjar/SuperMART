import express from 'express'
import { addSeller, getSeller } from '../services/sellerServices.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
const router = express.Router()
import {} from 'dotenv/config'
import { passport } from '../middlewares/passport-jwt_sellers.js';
import { prisma } from '../prisma/prismaClientModule.js'

router.route('/get-seller-details').get(passport.authenticate('jwt',{ session: false}), async (req, res)=> {
    console.log(req.user);
    res.status(200).send(req.user);
});

router.route('/refresh-token').get(async (req, res)=> {
    const token = req.headers['authorization'].split(' ')[1];
    const response = await prisma.token.findFirst({where: {refreshToken: token}})
    if(response){
        const seller = jwt.verify(token, process.env.SELLER_REFRESH_TOKEN_SECRET);
        const newAccessToken = jwt.sign(seller, process.env.SELLER_ACCESS_TOKEN_SECRET);
        res.status(200).json({seller, newAccessToken});
    }
});
router.route('/login').post(async (req,res)=>{
    console.log(req.body);
    //if email or password is empty or undefined send error
    if(!req.body.email || !req.body.password) res.status(403).send({"message": "email/password empty"});
    
    try{
        const response = await getSeller(req.body.email, req.body.password);
        const seller = {
            id: response.id,
            name: response.name,
            email: response.email,
            phoneNumber: response.phoneNumber
        }
        //if seller exists send back details
        if(seller){
            const accessToken = jwt.sign(seller, process.env.SELLER_ACCESS_TOKEN_SECRET, { expiresIn: '15s'});
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
    //get the seller details
   
})

router.route('/logout').get(async (req,res) => {
    const token = req.headers['authorization'].split(' ')[1];
    prisma.token.delete({where: { refreshToken: token}})
    res.status(200).send({'message': 'Token has been deleted'});
});

router.route('/register').post( async (req, res) => { 
    console.log('\n-----New Seller Details-----\n',req.body,'\n');
    const seller = {
        ...req.body,
        "isActive": true,
        "isBlocked": false,
        "passwordUpdateToken": uuidv4(),
    }
    const response = await addSeller( seller);
    res.status(200).send(response);
})

export default router;