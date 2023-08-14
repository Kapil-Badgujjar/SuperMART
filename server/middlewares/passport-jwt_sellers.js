import {} from 'dotenv/config'
import { prisma } from '../prisma/prismaClientModule.js';
import passport from "passport";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";

async function getSeller ( id ){
    const seller = await prisma.seller.findFirst({ where: { id: id }});
    console.log(seller);
    return { 
        "id": seller.id,
        "name": seller.name,
        "email": seller.email,
        "phoneNumber": seller.phoneNumber
    };
}

const jwtOpts = {
    "jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
    "secretOrKey": process.env.SELLER_ACCESS_TOKEN_SECRET
}

passport.use(new jwtStrategy(jwtOpts, async (jwtPayload, done)=>{
    // console.log(jwtPayload, '<<<-------------- JWT Payload');
    const seller = await getSeller(jwtPayload.id);
    if(seller){
        return done(null, seller);
    } else {
        return done(null, false);
    }

}))

export { passport };