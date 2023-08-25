import {} from 'dotenv/config'
import express from 'express'
const router = express.Router()
import jwt from 'jsonwebtoken';
import { getUser, addUser, getUserAddress, orderDone, reverseOrder, verifyAccount, forgotPasswordRequest, resetPassword, changePassword, checkEmailAvailibility } from '../services/userServices.js'; // Function from user services
import { getOrders, cancelOrder, returnOrder } from '../services/orderServices.js';
import authenticateUser from '../middlewares/authMiddlewareUser.js';    // authenticateUser middleware
import { prisma } from '../prisma/prismaClientModule.js';   // Prisma client
import stripeFunction from '../utils/stripe.js';
import { addUpdateRating, addUpdateReview, invalidateRatingReview, getMyRatingReviews } from '../services/ratingReviewServices.js';
import { testEmail, testPassword, testPhoneNumber } from '../utils/dataValidator.js';
import signupMail from '../utils/sendGridSignupEmail.js';
import passwordResetEmail from '../utils/sendGridPasswordResetEmail.js';
// Authenticate users and send back user details
router.route('/get-user-details').get(authenticateUser, async (req, res) =>  res.status(200).send({id: req.user.id, name: req.user.name, email: req.user.email, phoneNumber: req.user.phoneNumber}));

// Route to refresh user access token if exipired
router.route('/refresh-token').get(async (req, res) => {

    // Extract user access token from header 
    const refreshToken = req.headers['authorization'].split(' ')[1];

    if(!refreshToken) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }

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
            res.status(200).send({ newAccessToken: newAccessToken, user: user});
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
    if(!req.body.email && !req.body.password) { 
        res.status(403).send({message: '* Please enter your email and password'});
        return;
    }

    if(!testEmail(req.body.email)){
        res.status(400).send({message: '* Please enter valid email address'});
        return;
    }else if(!testPassword(req.body.password)){
        res.status(400).send({message: '* Password must match [a-zA-Z0-9$!@#...]'});
        return;
    }

    try{
        const { flag, message, user } = await getUser(req.body.userId, req.body.password);     // getUser function called with email and password
        if(!flag) {
            res.status(401).send({message});
            return;
        }
        if(user) { 

            // Create access token and refresh token
            const accessToken = jwt.sign( user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'});
            const refreshToken = jwt.sign( user, process.env.REFRESH_TOKEN_SECRET);

            // Save the refresh token
            const response = await prisma.token.create({data: { refreshToken: refreshToken}});

            // Check if token is saved successfully and send the response
            if(response) res.status(200).send({message: 'Logged In successfully', user, accessToken, refreshToken});
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
    const refreshToken = req.headers['authorization'].split(' ')[1];

    if(!refreshToken) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }

    try {

        // Delete the refresh token from the database
        await prisma.token.delete({where: { refreshToken: refreshToken }});

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
    if(!req.user?.id) { 
        res.status(401).send({message: 'Access Denied'});
        return;
    }

    const address = await getUserAddress(req.user.id);

    if(address) {
        res.status(200).send({address: address});
    } else {
        res.status(404).send({message: 'Address not found'});
    }
});

// Signup route
router.route('/signup').post(async (req, res) => {
    if(!req.body) { 
        res.status(401).send({message: ' Access Denied'});
        return;
    }
    console.log(req.body);
    if(!req.body.name){
        res.status(400).send({ message: ' Please enter a name'});
        return;
    } else if(!testPhoneNumber(req.body.phoneNumber)){
        res.status(400).send({ message: ' Please enter phone number'});
        return;
    }else if(!req.body.dateOfBirth||req.body.dateOfBirth.length !== 10){
        res.status(400).send({ message: ' Please enter date of birth'});
        return;
    }else if(!testEmail(req.body.email)){
        res.status(400).send({ message: ' Please enter valid email address'});
        return;
    }else if(!testPassword(req.body.password)){
        res.status(400).send({ message: ' Enter a strong password [a-zA-Z0-9$!@#...]'});
        return;
    }else if(req.body.password !== req.body.confirmPassword){
        res.status(400).send({ message: ' Confirm Password not matched'});
        return;
    } else if(!req.body.gender){
        res.status(400).send({ message: ' Please select a gender'});
        return;
    }else if(!req.body.address){
        res.status(400).send({ message: ' Please enter an address'});
        return;
    }
    const checkEmail = await checkEmailAvailibility(req.body.email);
    if(checkEmail){
        res.status(400).send({ message: ' Email already Registered'});
        return;
    }

    // Add new user
    const response = await addUser( req.body );     // addUser function

    console.log(response); //

    // If Response received
    if(response) {
        signupMail(req.body.email, response);
        res.status(200).send({message: 'Signup successfully'}); // Send response back to client
    }else {
        res.status(500).send({message: 'Signup failed'}); //send error response back to client
    }
})

router.route('/verify-account/:token').get(async (req, res) => {
    const token = req.params.token;
    const response = await verifyAccount(token);
    if(response){
        res.status(200).redirect(process.env.CLIENT_URL+'/account-verified');
    } else {
        res.status(404);
    }
});

router.route('/forgot-password').post(async (req,res) => {
    console.log(req.body);
    if(!testEmail(req.body.email)){
        res.status(400).send({message: '* Please enter a valid email id'});
        return;
    }
    const response = await forgotPasswordRequest(req.body.email);
    if(response){
        passwordResetEmail(req.body.email,response)
        res.status(200).send({message: "Successfully forgot password"});
    } else {
        res.status(404).send({message: "No account found"});
    }
});

router.route('/reset-password').post(async (req,res) => {
    if(!testPassword(req.body.newPassword)) {
        res.status(400).send({message: '* Enter a strong password [a-zA-Z0-9$!@#...]'});
        return;
    }
    const response = await resetPassword(req.body.token, req.body.newPassword);
    if(response?.flag) res.status(200).send({message: "Success"});
    else res.status(500).send({message: "* Failed to reset password"});
});

router.route('/update-password').post(authenticateUser, async (req,res) => {
    if(!testPassword(req.body.newPassword)) {
        res.status(400).send({message: '* Enter a strong password [a-zA-Z0-9$!@#...]'});
        return;
    }
    const response = await changePassword(req.user.id, req.body.newPassword);
    if(response?.flag) res.status(200).send({message: "Success"});
    else res.status(500).send({message: "Failed to reset password"});
});

router.route('/make-order-session').post(authenticateUser, async (req, res) => {
    return stripeFunction(req.body.address, req.user.id, res);
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

router.route('/get-my-product-ratings-reviews').post(authenticateUser, async (req, res) => {
    const userId = req.user.id;
    const productId = req.body.productId;
    const ratings = await getMyRatingReviews(userId,productId);
    if(ratings){
        res.status(200).send(ratings);
    } else {
        res.status(404).send({message: 'Ratings not found'});
    }
});

export default router;