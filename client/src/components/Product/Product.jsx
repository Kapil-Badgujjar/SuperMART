import React from 'react'
import styles from './Product.module.css'
import AppleWatch from '/apple_watch.png';
import { useNavigate } from 'react-router-dom';
export default function Product(props) {
const navigate = useNavigate();
  return (
    <div className={styles.product_container} onClick={()=>{navigate(`/product/${props.product.id}`)}}>
        <div className={styles.product} >
            <div className={styles.image_container}>
                <img src={props.product.images[0]} alt='Product image' />
            </div>
            <div className={styles.details}>
                <div>
                    <span>{props.product.title}</span>
                    <span>{props.product.price*10}</span>
                </div>
                <div>
                    <span>{props.product.rating}</span>
                    <span>{Math.round((props.product.price-props.product.discountPercentage)*10)}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
