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
                <img src={props.product.image} alt='Product image' />
            </div>
            <div className={styles.details}>
                <div>
                    <span>{props.product.productName}</span>
                    <span>&#8377; {props.product.price}</span>
                </div>
                <div>
                    {/* <span>{props.product.rating}</span> */}
                    <span>Offer Price : </span>
                    <span>&#8377; {Math.round((props.product.price- (props.product.price/100)*props.product.offer))}</span>
                </div>
            </div>
        </div>
    </div>
  )
}
