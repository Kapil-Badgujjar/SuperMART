import React, { useState, useEffect } from 'react'
import styles from './ProductPage.module.css'
import pimg from '/apple_watch.png'
import Button from '../../components/Button/Button';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export default function ProductPage() {
  const { id }  = useParams('id');
  const [product, setProduct] = useState(undefined);
  const [ quantity, setQuantity] = useState(1);
  useEffect(()=>{
    axios.get(`https://dummyjson.com/products/${id}`).then((response)=>{
      if(response.status === 200) {
        setProduct(response.data);
        console.log(response.data);
      }
    })
  },[]);
  if(!product) return (<></>);
  return (
    <div className={styles.product_page_container}>
        <div className={styles.product_page}>
          <div className={styles.product_details}>
            <div className={styles.left}>
              <img src={product?.images[0]} alt='product image' />
            </div>
            <div className={styles.right}>
              <div>
                <h2>{product?.title}</h2>
                <br />
                <p>{product?.description}</p>
                <br />
                <h3>&#8377; {product.price*100}</h3>
              </div>
              <div className={styles.btns}><span>-</span><p>5</p><span>+</span> <Button value="Add to Cart" /></div>
            </div>
          </div>
          <h2 className={styles.review_heading}>Reviews</h2>
          <div className={styles.reviews}>
            <div>
              <h3>User Name: Kapil</h3>
              <h4>Rating: 4.5</h4>
              <p>Value for money product. Must buy</p>
            </div>
            <div>
              <h3>User Name: Kapil</h3>
              <h4>Rating: 4.5</h4>
              <p>Value for money product. Must buy</p>
            </div>
            <div>
              <h3>User Name: Kapil</h3>
              <h4>Rating: 4.5</h4>
              <p>Value for money product. Must buy</p>
            </div>
            <div>
              <h3>User Name: Kapil</h3>
              <h4>Rating: 4.5</h4>
              <p>Value for money product. Must buy</p>
            </div>
          </div>
        </div>
    </div>
  )
}
