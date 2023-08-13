import {} from 'dotenv/config'
import passport from "passport";
import { Strategy as jwtStrategy, ExtractJwt } from "passport-jwt";

const USER = {
    "id": "64d4af138e4aa28cdc6e6bf4",
    "name": "Kapil Badgujjar",
    "email": "kapilbadgujjar99@gmail.com",
    "password": "Kapil@123",
}

const jwtOpts = {
    "jwtFromRequest": ExtractJwt.fromAuthHeaderAsBearerToken(),
    "secretOrKey": process.env.ACCESS_TOKEN_SECRET
}

passport.use(new jwtStrategy(jwtOpts, async (jwtPayload, done)=>{
    console.log(jwtPayload, '<<<-------------- JWT Payload');
    if(jwtPayload.id === USER.id){
        return done(null, USER);
    } else {
        return done(null, false);
    }

}))

export { passport };