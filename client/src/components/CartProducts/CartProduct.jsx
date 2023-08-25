import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './CartProduct.module.css'
import { useDispatch } from 'react-redux';
import { removeProduct, updateQuantity } from '../../features/userCart/userCartSlice';
import axios from 'axios';

export default function CartProduct(props) {
  console.log(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function updateQuantityFun( flag ){
    if(props.item.quantity === 1 && !flag) {
      removeItem();
      return;
    }
    const token = localStorage.getItem('userToken');
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/cart/update-cart',
       {item: props.item, quantity: flag ? props.item.quantity+1:props.item.quantity-1},
       {
        withCredentials: true,
        headers: { "Authorization": "Bearer " + token},
      })
      if(response) dispatch(updateQuantity({id: props.item.product.id, flag}));
      else console.log('can not update');
    } catch (error) {
      console.log(error);
    }
  }

  async function removeItem(){
    const token = localStorage.getItem('userToken');
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + "/cart/remove-product", {item: props.item}, {
        withCredentials: true,
        headers: { "Authorization": "Bearer " + token}
      });
      if(response.status === 200) dispatch(removeProduct(props.item));
      else console.log("Can't remove product");
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.product}>
        <img src={props.item.product.image} alt='product image'/>
        <div className={styles.product_detail}>
            <span className={styles.name}>{props.item.product.productName}</span>
            <span className={styles.price}>&#8377; {Math.round(props.item.product.price - (props.item.product.offer*props.item.product.price/100))}</span>
            <div className={styles.btnDiv}>
              <button onClick={()=> {updateQuantityFun(false)}}>-</button>
              <span> {props.item.quantity} </span>
              <button onClick={()=> {updateQuantityFun(true)}}>+</button>
              <button onClick={removeItem}> Remove</button>
            </div>
        </div>
    </div>
  )
}
