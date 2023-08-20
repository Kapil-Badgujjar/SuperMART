import React from 'react'
import styles from './Product.module.css'
import Button from '../../../components/Button/Button';
export default function Product(props) {
    console.log(props);
  return (
    <div className={styles.productRow}>
        <img className={styles.productImage} src={props.product.image} alt={props.product.productName}/>
        <span className={styles.productName}>{props.product.productName}</span>
        <span className={styles.productPrice}>&#8377; {props.product.price}</span>
        <span className={styles.productStocks}>{props.product.stocks}</span>
        <span><Button value={props.product.isActive ? 'true': 'false'} action={()=>{}} /></span>
        <span><Button value="Edit" action={()=>{}} /></span>
    </div>
  )
}
