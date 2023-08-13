import React from 'react'
import { useNavigate } from 'react-router-dom'
import image from '/welcome/buds.jpg'
import styles from './SearchedProduct.module.css'
export default function SearchedProduct() {
    const navigate = useNavigate();
  return (
    <div className={styles.product} onClick={()=>{navigate('/product/1')}}>
        <img src={image} alt='product image' />
        <div className={styles.product_detail}>
            <span className={styles.name}>Bluetooth Earbuds</span>
            <span className={styles.price}>&#8377; 1000/-</span>
        </div>
    </div>
  )
}
