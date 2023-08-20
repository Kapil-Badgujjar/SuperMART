import {} from 'dotenv/config'
import jwt from 'jsonwebtoken'

async function authenticateUser(req, res, next) {
    const token = req.headers['authorization'].split(' ')[1];
    if(!token) return res.status(401).send({message: 'Invalid token'});

    try {
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = {
            "id": decodeToken.id,
            "name": decodeToken.name,
            "email": decodeToken.email,
            "phoneNumber": decodeToken.phoneNumber
        }
        req.user = user;
        next();
    } catch(error) {
        return res.status(500).send({message: 'Internal Server Error!'});
    }

}

export default authenticateUser;