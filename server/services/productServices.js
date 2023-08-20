import { prisma } from '../prisma/prismaClientModule.js';
import { firbaseStorage } from '../config/firebase.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

async function addProduct(productDetails, imageFile){
    try{
        const fileName = uuidv4().toString() + '.' + imageFile.originalname.split('.').pop();
        const metadata = {
            contentType: imageFile.mimetype
        }
        const imageRef = ref(firbaseStorage, 'images/' + fileName);
        const uploadTask = await uploadBytes(imageRef, imageFile.buffer, metadata);
        const downloadUrl = await getDownloadURL(uploadTask.ref);

        const tempProductDetails = productDetails;
        const product = {};
        product.productName = tempProductDetails.productName;
        product.price = Number(tempProductDetails.price);
        product.description = tempProductDetails.description;
        product.stocks = Number(tempProductDetails.stocks);
        product.offer = Number(tempProductDetails.offer);
        product.category = tempProductDetails.category;
        product.image = downloadUrl;
        product.sellerId = tempProductDetails.sellerId;
        product.isActive = true;
        product.isAssured = false;
        for( const key in product ){
            delete tempProductDetails[key];
        }
        product.otherSpecifications = { ...tempProductDetails  };
        console.log(product);
        const response = await prisma.product.create({data: product});
        return response;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getAllProducts(){
    try{
        const products = await prisma.product.findMany();
        return products;
    } catch(error) {
        console.log(error);
        return [];
    }
}

async function getProductsByCategory(category){
    try{
        const products = await prisma.product.findMany({where: {category: category}});
        return products;
    } catch(error) {
        console.log(error);
        return [];
    }
}

async function searchProduct(pattern){
    try{
        const products = await prisma.product.findMany({where: {productName: { contains: pattern, mode: 'insensitive' }}});
        return products;
    } catch(error) {
        console.log(error);
        return [];
    }
}


export  { getAllProducts, addProduct, getProductsByCategory, searchProduct };