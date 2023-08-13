import { prisma } from '../prisma/prismaClientModule.js';

async function getSeller( email, password){
    try{
        const seller = await prisma.seller.findFirst({ where: { email: email, password: password}});
        return seller;
    } catch(error){
        console.log(error.message);
    }
}

async function addSeller( seller ) {
    try{
        const response = await prisma.seller.create({ data: seller });
        return response;
    } catch(error) {
        console.log(error.message);
    }
}

export { getSeller, addSeller };