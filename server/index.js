import express from 'express';
const app = express();
import cors from 'cors';

import User from './router/users.js';
import Cart from './router/cart.js';
import Seller from './router/sellers.js';
import Products from './router/products.js';
import Admin from './router/admin.js';

import { passport } from './middlewares/passport-jwt_authentication.js'

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('./public'));
app.use(passport.initialize());

app.use('/user',User);
app.use('/cart',Cart);
app.use('/sellers',Seller);
app.use('/products',Products);
app.use('/admin',Admin);

app.listen(7777, (err)=>{
    if(!err) console.log('Server started...');
})