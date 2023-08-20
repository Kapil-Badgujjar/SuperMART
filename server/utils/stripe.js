import {} from 'dotenv/config'
import stripeImport from 'stripe';
import { getCartData } from '../services/cartServices.js';
import { initiateOrder } from '../services/userServices.js';
import { v4 as uuidv4 } from 'uuid';
const stripe = stripeImport(process.env.STRIPE_SECRET_KEY);

async function stripeFunction(address,userId,res) {
  const cartItems = await getCartData(userId)
  const payment_id = uuidv4().toString();
  const orderInitiated = await initiateOrder(userId, address, payment_id);
  if(!orderInitiated) res.status(500).send({message: 'Internal Server Error'});
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: cartItems.map((item)=>{
      return {
          price_data : {
            currency: 'INR',
            product_data: {
              name: item.product.productName,
            },
            unit_amount: item.product.price*100,
          },
          quantity: item.quantity
        }
    }),
    success_url: process.env.SERVER_URL + `/user/order-success/${payment_id}`,
    cancel_url: process.env.SERVER_URL + `/user/order-cancel/${payment_id}`
  });
  res.json({url: session.url});
};

export default stripeFunction;