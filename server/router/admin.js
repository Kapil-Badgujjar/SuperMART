import {} from 'dotenv/config'
import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
const router = express.Router()

router.route('/login').post((req, res) => {
    const admin = {
        name: 'Kapil Badgujjar',
        id: 10001
    }
    if(req.body.password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign(admin, process.env.ADMIN_SECRET_KEY, { expiresIn: '30m'});
        res.status(200).send({ message: "Success!", token: token });
        return;
    }
    res.status(400).send({ message: "Session Expired!" });
});

router.route('/get-seller').get((req, res) => {

});

export default router;