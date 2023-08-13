import {} from 'dotenv/config'
import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken';
import { getUser, addUser } from '../services/userServices.js ';
import { passport } from '../middlewares/passport-jwt_authentication.js';
router.route('/authenticate-user').post((req, res) => {
    const token = req.headers['authorization'].split(' ')[1];
    const userid = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(token);
    console.log(userid);
    res.status(200).send({isValid: true, id: userid});
})

router.route('/check-passportjwt').post(passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).send({"message": "Passport jwt authenticated passed."});
});

router.route('/login').post(async (req, res) => {
    if(!req.body.email || !req.body.password) { res.status(403).send('Please enter your email and password'); return; }
    console.log(req.body);
    const user = await getUser(req.body.userId, req.body.password);
    console.log(user);
    if(user) {
        const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET);
        res.status(200).send({user, accessToken});
    } else {
        res.status(403).send({msg: 'login failed, please check your credentials and try again'});
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