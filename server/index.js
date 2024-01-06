import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import User from './router/users.js';
import Cart from './router/cart.js';
import Seller from './router/sellers.js';
import Products from './router/products.js';
import Admin from './router/admin.js';
const app = express();
const port = process.env.PORT || 7777;
const allowedOrigins = [process.env.CLIENT_URL];

// Setting cors policy
app.use(cors({
    origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Authorization', 'Content-Type'],
    optionsSuccessStatus: 204,
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

// Routes
app.use('/user', User);
app.use('/cart', Cart);
app.use('/sellers', Seller);
app.use('/products', Products);
app.use('/admin', Admin);

// Start listening
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
