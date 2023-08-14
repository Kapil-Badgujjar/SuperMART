import {} from 'dotenv/config'
import { prisma } from '../prisma/prismaClientModule.js';
import passport from "passport";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";

async function getUser ( id ){
    const user = await prisma.user.findFirst({ where: { id: id }});
    console.log(user);
    return { 
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phoneNumber": user.phoneNumber
    };
}

const jwtOpts = {
    "jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
    "secretOrKey": process.env.ACCESS_TOKEN_SECRET
}

passport.use(new jwtStrategy(jwtOpts, async (jwtPayload, done)=>{
    // console.log(jwtPayload, '<<<-------------- JWT Payload');
    const user = await getUser(jwtPayload.id);
    if(user){
        return done(null, user);
    } else {
        return done(null, false);
    }

}))

export { passport };