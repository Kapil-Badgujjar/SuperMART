import express from 'express'
const router = express.Router()

router.route('/login').post((req, res) => {
    console.log(req.body);
});

router.route('/get-seller').get((req, res) => {
    res.status(200).send([
        {
            "name": "Kapil",
            "id": "02038",
            "items": "44",
            "registrationDate": "20-12-2023",
            "isVerified": "true",
            "isActive": "true",
            "isBlocked": "false"
        }
    ])
});

export default router;