import { prisma } from "../prisma/prismaClientModule.js";

async function getOrders(userId){
    try {
        const response = await prisma.order.findMany({ 
            where: { 
                userId: userId
            } , 
            select: { 
                id: true,
                amount: true,
                productId: true,
                quantity: true,
                status: true,
                paymentStatus: true,
                shipmentTrackingId: true,
                cancelationRequest: true,
                returnStatus: true,
                product: {
                    select: {
                        id: true,
                        productName: true,
                        image: true,
                        price: true,
                    }
                }
            }
        });
        if(response) return response;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function cancelOrder(id){
    try{
        const response = await prisma.order.update({where: { id: id}, data: { status: 'canceled', cancelationRequest: true }});
        if(response) return true;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function returnOrder(id){
    return await returnStatusChange(id, 'requested');
    // try{
    //     const response = await prisma.order.update({where: { id: id}, data: { returnStatus: 'requested' } });
    //     if(response) return true;
    //     else return false;

    // } catch (error) {
    //     console.log(error.mressage);
    //     return false;
    // }
}

async function returnStatusChange(id, status){
    try{
        const response = await prisma.order.update({where: { id: id}, data: { returnStatus: status } });
        if(response) return true;
        else return false;

    } catch (error) {
        console.log(error.mressage);
        return false;
    }
}

export { getOrders, cancelOrder, returnOrder, returnStatusChange };