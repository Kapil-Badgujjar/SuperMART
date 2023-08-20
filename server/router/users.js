import {} from 'dotenv/config'
import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken';
import { getUser, addUser, getUserAddress, orderDone, reverseOrder } from '../services/userServices.js'; // Function from user services
import { getOrders, cancelOrder, returnOrder } from '../services/orderServices.js';
import authenticateUser from '../middlewares/authMiddlewareUser.js';    // authenticateUser middleware
import { prisma } from '../prisma/prismaClientModule.js';   // Prisma client
import stripeFunction from '../utils/stripe.js';
import { addUpdateRating, addUpdateReview, invalidateRatingReview } from '../services/ratingReviewServices.js';

// Authenticate users and send back user details
router.route('/get-user-details').get(authenticateUser, async (req, res) =>  res.status(200).send(req.user));

// Route to refresh user access token if exipired
router.route('/refresh-token').get( async (req, res) => {

    // Extract user access token from header 
    const refreshToken = req.headers['authorization'].split(' ')[1];

    try {
        // Check if the refresh token present in our records/database
        const token = await prisma.token.findFirst({ where: {
            refreshToken: refreshToken
        }})
        if(token){   // If token present

            // Extract user details
            const userDetails = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = {
                id: userDetails.id,
                name: userDetails.name,
                email: userDetails.email,
                phoneNumber: userDetails.phoneNumber
            }

            // Create a new access token
            const newAccessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});

            // send the response back to client
            res.status(200).send({ newAccessToken: newAccessToken });
        } else {
            // If token is invalid
            res.status(403).send({ message: 'Access denied'});
        }
    } catch (error) { // Catch errors

        // Send back error response
        res.status(403).send({ message: error.message });
    }
   
});

// User login route
router.route('/login').post(async (req, res) => {

    // Check for email and password is not empty
    if(!req.body.email || !req.body.password) { res.status(403).send('Please enter your email and password'); return; }
    try{
        const user = await getUser(req.body.userId, req.body.password);     // getUser function called with email and password
        if(user) { 
            console.log(user);

            // Create access token and refresh token
            const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
            const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET);

            // Save the refresh token
            const response = await prisma.token.create({data: { refreshToken: refreshToken}});

            // Check if token is saved successfully and send the response
            if(response) res.status(200).send({user, accessToken, refreshToken});
            else res.status(403).send({msg: 'login failed, please check your credentials and try again'});
        } else {

            // If user not exists
            res.status(403).send({msg: 'login failed, please check your credentials and try again'});
        }
    } catch (error) { // Catch any error

        // Send back error response
        res.status(403).send({msg: 'login failed, please check your credentials and try again'});
    }
})

// Logout route
router.route('/logout').get(async (req,res)=>{
    // Extract the refresh token from headers
    const token = req.headers['authorization'].split(' ')[1];

    try {

        // Delete the refresh token from the database
        await prisma.token.delete({where: { refreshToken: token }});

        // Send back the response
        res.status(200).send({message: 'Logout successfully'});
    } catch(error) { // Catch error
        console.log(error.message);

         // Send back error response
        res.status(500).send({message:'Internal server error'});
    }
})

// Get user address 
router.route('/get-user-address').get(authenticateUser, async (req, res)=>{
    const address = await getUserAddress(req.user.id);
    if(address) {
        res.status(200).send({address: address});
    } else {
        res.status(404).send({message: 'Address not found'});
    }
});

// Signup route
router.route('/signup').post(async (req, res) => {

    // Add new user
    const response = await addUser( req.body );     // addUser function

    // Send email for varification 
    /*************
     * 
     * 
     * ***********/

    // If Response received
    if(response)  res.status(200).send(response); // Send response back to client
    else res.status(500).send({message: 'Signup failed'}); //send error response back to client
})

router.route('/forgot-password').post((req,res) => {
    console.log(req.body);
});

router.route('/update-password').post((req,res) => {
    console.log(req.body);
});

router.route('/make-order-session').post(authenticateUser, async (req, res) => {
    stripeFunction(req.body.address, req.user.id, res);
});

router.route('/order-success/:payment_id').get(async (req,res)=>{
    const payment_id = req.params.payment_id;
    const response = await orderDone(payment_id);
    if(response){
        // send a order confirmation mail to the customer
        res.redirect(process.env.CLIENT_URL +'/success')
    } else {
        console.log('error occurred');
        await reverseOrder(payment_id);
        res.redirect(process.env.CLIENT_URL+'/cancel')
    }
});

router.route('/order-cancel/:payment_id').get(async (req,res)=>{
    const payment_id = req.params.payment_id;
    await reverseOrder(payment_id);
    res.redirect(process.env.CLIENT_URL+'/cancel')
});

router.route('/orders').get(authenticateUser, async (req, res)=>{
    const ordersData = await getOrders(req.user.id);
    if(ordersData) res.status(200).send(ordersData);
    else res.status(500).send({message: 'internal server error'});
});

router.route('/cancel-product-order').post(authenticateUser, async (req,res)=>{
    console.log(req.body.id);
    const response = await cancelOrder(req.body.id);
    await invalidateRatingReview(req.user.id, req.productId );
    if(response) res.status(200).send({message: 'Success'});
    else return res.status(500).send({message: 'Internal server error'});
});

router.route('/reques-to-return-product').post(authenticateUser, async (req,res)=>{
    const response = await returnOrder(req.body.productId);
    await invalidateRatingReview(req.user.id, req.productId );
    if(response) res.status(200).send({message: 'Success'});
    else return res.status(500).send({message: 'Internal server error'});
});

router.route('/rating').post(authenticateUser, async (req, res) => {
    console.log(req.user.id, req.body.productId, req.body.rating);
    const response = await addUpdateRating(req.user.id, req.body.productId, req.body.rating);
    if(response)  res.status(200).send({message: 'Success'});
    else res.status(500).send({message: 'Internal Server Error'});
});

router.route('/review').post(authenticateUser, async (req, res) => {
    console.log(req.user.id, req.body.productId, req.body.review);
    const response = await addUpdateReview(req.user.id, req.body.productId, req.body.review);
    if(response)  res.status(200).send({message: 'Success'});
    else res.status(500).send({message: 'Internal Server Error'});
});

export default router;