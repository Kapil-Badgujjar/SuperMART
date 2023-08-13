import express from 'express'
import { addSeller, getSeller } from '../services/sellerServices.js'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
const router = express.Router()
import {} from 'dotenv/config'
router.route('/login').post(async (req,res)=>{

    //if email or password is empty or undefined send error
    if(!req.body.email || !req.body.password) res.status(403).send({"message": "email/password empty"});
    
    //get the seller details
    const user = await getSeller(req.body.email, req.body.password);

    //if seller exists send back details
    if(user){
        const accessToken = jwt.sign(user.email, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({user, accessToken});
    }else{  //else send error
        res.status(403).send({message: 'No account found'});
    }
})

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