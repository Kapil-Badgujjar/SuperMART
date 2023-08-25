import { prisma } from '../prisma/prismaClientModule.js';
import { v4 as uuidv4 } from 'uuid'
async function getUser(email, password){
    try {
        const response = await prisma.user.findFirst({where: {email: email, password: password}});
        if(!response.isVerified) return { flag: false, message: '* Please verify you account first', user: undefined };
        // if(!response.isActive) return { flag: false, message: '* Please activate your account ', user: undefined };
        if(response.isBlocked) return { flag: false, message: '* You are blocked by admin, Please contact to admin', user: undefined };
        const user = {};
        user.id = response.id;
        user.name = response.name;
        user.email = response.email;
        user.phoneNumber = response.phoneNumber;
        return { flag: true, message: "Valid user", user};
    } catch (err) {
        console.log(err.message);
        return false;
    }
}

async function addUser( userData ){
    const dobString = userData.dateOfBirth;
    const user = {
        ...userData,
        "dateOfBirth": {
            "day": Number(dobString.slice(-2)),
            "month": Number(dobString.slice(5,7)),
            "year": Number(dobString.slice(0,4))
        },
        "isActive": false,
        "isVerified":  false,
        "premiumMember": false,
        "registrationDate": new Date().toISOString(),
        "passwordResetToken": uuidv4().toString(),
        "verificationToken": uuidv4().toString(),
        "profilePicture": '',
        "isBlocked": false,
        "confirmPassword": undefined,
    }
    try {
        const response = await prisma.user.create({data: user});
        if(response) return response.verificationToken;
        else return false;
    } catch( error ){
        console.log(error);
        return false;
    }
}

async function verifyAccount(token){
    try {
        const response = await prisma.user.updateMany({where: {verificationToken: token}, data: { isActive: true, isVerified: true}});
        console.log(response);
        return true;
    } catch (error) {
        return false;
    }
}

async function getUserAddress(userId){
    try{
        const userAddress = await prisma.user.findFirst({ where: { id: userId}, select: { address: true} });
        return userAddress.address;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function initiateOrder(userId, address, paymentId){
    try {
        const cartData = await prisma.cart.findMany(
            {
                where: {userId: userId}, 
                select: { 
                    userId: true, 
                    quantity: true, 
                    product: {
                        select: { 
                            id: true,
                            price: true,
                            sellerId: true,
                        }
                    }
                }
            });
        const orderData = cartData.map((item)=>{
            return {
                paymentId: paymentId,
                userId: item.userId,
                address: address,
                productId: item.product.id,
                sellerId: item.product.sellerId,
                quantity: item.quantity,
                amount: item.quantity * item.product.price,
                status: 'initiated',
                paymentStatus: 'pending',
                shipmentTrackingId: uuidv4().toString(),
                orderDate: new Date().toISOString(),
                cancelationRequest: false,
                returnStatus: 'none',
            }
        });
        const response = await prisma.order.createMany({data: orderData});
        if(response) return true;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function orderDone(payment_id){
    try {
        const response = await prisma.order.updateMany({where: { paymentId: payment_id}, data: { status: 'pending', paymentStatus: 'received'}});
        if(response) {
            const data = await prisma.order.findFirst({where: {paymentId: payment_id}, select: { userId: true}});
            const cartResponse = await prisma.cart.deleteMany({where: { userId: data.userId}});
            if(cartResponse) return true;
            else return false;
        }
        else return false;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}

async function reverseOrder(payment_id){
    try {
        const response = await prisma.order.updateMany({where: { paymentId: payment_id}, data: { status: 'canceled', paymentStatus: 'failed'}});
        if(response) return true;
        else return false;
    } catch (error) {
        console.error(error.message);
        return false;
    }
}


async function forgotPasswordRequest(emailId){
    const newToken = uuidv4().toString();
    try {
        const response = await prisma.user.update({where: {email: emailId}, data: {passwordResetToken: newToken}});
        if(response) return newToken;
        else return undefined;
    } catch (error) {

        return undefined;
    }
}

async function changePassword(userId, newPassword){
    try {
        const response = await prisma.user.updateMany({where: {id: userId}, data: {password: newPassword}});
        if(response.count > 0) return { flag: true, message: 'Success'};
        else return { flag: false, message: 'Failed to reset'};
    } catch (error) {
        return { flag: false, message: error.message}
    }
}

async function resetPassword(token, newPassword){
    const newToken = uuidv4().toString();
    try {
        const response = await prisma.user.updateMany({where: {passwordResetToken: token}, data: { password: newPassword, passwordResetToken: newToken}});
        if(response.count > 0) return { flag: true, message: 'Success'};
        else return { flag: false, message: 'Failed to reset'};
    } catch (error) {
        console.log(error);
        return { flag: false, message: error.message}
    }
}

export { getUser, addUser, verifyAccount, changePassword, forgotPasswordRequest, resetPassword, getUserAddress, initiateOrder, orderDone, reverseOrder };