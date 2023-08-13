import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '/welcome/buds.jpg'
import styles from './CartProduct.module.css'
import Button from '../Button/Button';
export default function CartProduct(props) {
    const navigate = useNavigate();
  return (
    <div className={styles.product} onClick={()=>{navigate('/product/1')}}>
        <img src={props.product.image} alt='product image' />
        <div className={styles.product_detail}>
            <span className={styles.name}>{props.product.name}</span>
            <span className={styles.price}>&#8377; {props.product.price}</span>
            <div>
              <button>-</button>
              <span> {props.product.quantity} </span>
              <button>+</button>
              <span> Remove</span>
            </div>
        </div>
    </div>
  )
}
