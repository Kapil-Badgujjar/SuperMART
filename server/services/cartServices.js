import { prisma } from '../prisma/prismaClientModule.js';

async function addProduct(item){
    try{
        const response = await prisma.cart.create({data: item});
        if(response) return true;
        else return false;
    } catch(e){
        console.log(e.message);
        return false;
    }
}

async function getCartData(id){
    try {
        const cartData = await prisma.cart.findMany({
            where: {userId: id},
            select: { quantity: true,
                product: { select : { id: true, image: true, productName: true, price: true }
            }}});
        if(cartData) return cartData;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function removeProduct(item,id){
    try{
        await prisma.cart.deleteMany({where: { userId: id,  product: { id: item.product.id}}});
        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

async function updateCartItemQuantity(item, quantity, id){
    try {
        const response = await prisma.cart.updateMany({ where: { userId: id, product: { id: item.product.id}}, data: { quantity: quantity}});
        if(response) return true; else  return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}

export { addProduct, removeProduct, getCartData, updateCartItemQuantity};