import {} from 'dotenv/config'
import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken';
import { getUser, addUser } from '../services/userServices.js ';
import { passport } from '../middlewares/passport-jwt_authentication.js';
import { prisma } from '../prisma/prismaClientModule.js';
// router.route('/authenticate-user').post((req, res) => {
//     const token = req.headers['authorization'].split(' ')[1];
//     const userid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     console.log(token);
//     console.log(userid);
//     res.status(200).send({isValid: true, id: userid});
// })

router.route('/refresh-token').get( async (req, res) => {
    const refreshToken = req.headers['authorization'].split(' ')[1];
    console.log(refreshToken);
    try {
        const token = await prisma.token.findFirst({ where: {
            refreshToken: refreshToken
        }})
        if(token){
            const userDetails = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = {
                id: userDetails.id,
                name: userDetails.name,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber
            }
            const newAccessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
            res.status(200).send({ newAccessToken: newAccessToken });
        } else {
            res.status(403).send({ message: 'Access denied'});
        }
    } catch (error) {
        res.status(403).send({ message: error.message });
    }
   
});

router.route('/check-passportjwt').post(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send(req.user);
});

router.route('/login').post(async (req, res) => {
    if(!req.body.email || !req.body.password) { res.status(403).send('Please enter your email and password'); return; }
    console.log(req.body);
    const user = await getUser(req.body.userId, req.body.password);
    console.log(user);
    if(user) {
        const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
        const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET);
        try{
            const response = await prisma.token.create({data: { refreshToken: refreshToken}});
            if(response) res.status(200).send({user, accessToken, refreshToken});
            else res.status(403).send({msg: 'login failed, please check your credentials and try again'});
        }
        catch(err){
            console.log(err)
            res.status(403).send({msg: 'login failed, please check your credentials and try again'});
        }
    } else {
        res.status(403).send({msg: 'login failed, please check your credentials and try again'});
    }
})
router.route('/logout').get(async (req,res)=>{
    const token = req.headers['authorization'].split(' ')[1];
    try {
        await prisma.token.delete({where: { refreshToken: token }});
        res.status(200).send({message: 'Logout successfully'});
    } catch(error) {
        console.log(error.message);
        res.status(500).send({message:'Internal server error'});
    }
})

router.route('/signup').post(async (req,res) => {
    const response = await addUser( req.body );
    if(response)  res.status(200).send(response);
    else res.status(500).send({message: 'Signup failed'});
})

router.route('/forgot-password').post((req,res) => {
    console.log(req.body);
});

router.route('/update-password').post((req,res) => {
    console.log(req.body);
});
export default router;