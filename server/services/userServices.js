import { prisma } from '../prisma/prismaClientModule.js';
import { v4 as uuidv4 } from 'uuid'
async function getUser(email, password){
    try {
        const response = await prisma.user.findFirst({where: {email: email, password: password}});
        const user = {};
        user.id = response.id;
        user.name = response.name;
        user.email = response.email;
        user.phoneNumber = response.phoneNumber;
        return user;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function addUser( userData ){
    const dobString = userData.dateOfBirth;
    const user ={
        ...userData,
        "dateOfBirth": {
            "day": Number(dobString.slice(-2)),
            "month": Number(dobString.slice(5,7)),
            "year": Number(dobString.slice(0,4))
        },
        "isActive": false,
        "isVerified":  false,
        "premiumMember": false,
        "registrationDate": Date.now().toString(),
        "passwordResetToken": undefined,
        "verificationToken": uuidv4(),
        "profilePicture": undefined,
        "isBlocked": false,
        "confirmPassword": undefined,
    }
    try {
        const response = await prisma.User.create({data: req.body});
        console.log(response);
        const user = {};
        user.userId = response.id;
        user.name = response.name;
        user.email = response.email;
        user.phoneNumber = response.phoneNumber;
        return user;
    } catch( error ){
        console.log(error);
        return false;
    }
}

export { getUser, addUser };