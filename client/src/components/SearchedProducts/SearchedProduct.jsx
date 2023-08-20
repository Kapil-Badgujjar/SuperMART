import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '/welcome/buds.jpg'
import styles from './SearchedProduct.module.css'
export default function SearchedProduct(props) {
    const navigate = useNavigate();
  return (
    <div className={styles.product} onClick={()=>{navigate('/product/1')}}>
        <img src={props.product.image} alt='product image' />
        <div className={styles.product_detail}>
            <span className={styles.name}>{props.product.productName}</span>
            <span className={styles.price}>&#8377; {props.product.price}/-</span>
        </div>
    </div>
  )
}
