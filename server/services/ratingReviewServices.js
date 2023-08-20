import { prisma } from '../prisma/prismaClientModule.js';

async function addUpdateRating(userId, productId, rating){
    const ratingData = {
        userId,
        productId,
        rating,
        text: '',
        isValid: true,
        date: new Date().toISOString()
    }
    try {
        let response = undefined;
        const ratingHistory = await prisma.ratingsReviews.findFirst({where: { userId: userId, productId: productId}});
        if(ratingHistory) response = await prisma.ratings.update({ where: {id: ratingHistory.id, userId: userId, productId: productId}, data :{ rating: rating} });
        else response = await prisma.ratingsReviews.create({data: ratingData});
        console.log(response);
        if(response) return true;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
async function addUpdateReview(userId, productId, text){
    const reviewData = {
        userId,
        productId,
        rating: 0,
        text,
        isValid: true,
        date: new Date().toISOString()
    }
    try {
        let response = undefined;
        const reviewHistory = await prisma.ratingsReviews.findFirst({where: { userId: userId, productId: productId}});
        if(reviewHistory) response = await prisma.ratingsReviews.update({ where: {id: reviewHistory.id, userId: userId, productId: productId}, data: { text: text}});
        else response = await prisma.reviews.create({ data: reviewData});
        if(response) return true;
        else return false;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}
async function invalidateRatingReview(userId, productId){
    try {
        const response = await prisma.ratingsReviews.updateMany({where: {userId: userId, productId: productId}, data: { isValid: false } });
        if(response) return true;
        else return false
    } catch (error) {
        console.log(error.message);
        return false;
    }
}


async function getRatingReviews(productId) {
    try {
        const reviews = await prisma.ratingsReviews.findMany({where: {productId: productId, isValid: true}, select: { rating: true, text: true, date: true, user: {select: {name: true}}}});
        return reviews;
    } catch (error) {
        console.log(error.message);
        return [];
    }
}

export { addUpdateRating, addUpdateReview, invalidateRatingReview, getRatingReviews };