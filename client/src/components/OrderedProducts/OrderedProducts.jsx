import React, { useState, useEffect } from 'react'
import styles from './OrderedProducts.module.css'
import axios from 'axios';
import Button from '../Button/Button';
import filledStar from '/ratingStarFilled.png';
import hollowStar from '/ratingStarHollow.png';

export default function OrderedProducts(props) {
    const [status, setStatus] = useState();
    const [reviewText, setReviewText] = useState('');
    const [ratingValue, setRatingValue] = useState(0);

    async function cancelOrder(){
        const token = localStorage.getItem('userToken');
        try {
            const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/user/cancel-product-order', { id: props.item.id },
            { 
                withCredentials: true,
                headers: {'Authorization': 'Bearer ' + token}
            })
            if(response.status === 200) setStatus('canceled');
        } catch (error) {
            console.log(error.message);
        }
    }

    async function sendRating(rate){
        setRatingValue(rate);
        const token = localStorage.getItem('userToken');
        try {
            await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/user/rating', {productId: props.item.product.id, rating: rate },
            { 
                withCredentials: true,
                headers: {'Authorization': 'Bearer ' + token}
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    async function sendReview(){
        const token = localStorage.getItem('userToken');
        try {
            await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/user/review', {productId: props.item.product.id, review: reviewText},
            { 
                withCredentials: true,
                headers: {'Authorization': 'Bearer ' + token}
            })
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(()=>{
        setStatus(props.item.status);
        async function getRatngsReviews(){
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + `/products/get-product-ratings-reviews/${props.item.product.id}`,
                    { withCredentials: true }
                  )
                if(response.status = 200){
                      setRatingValue(response.data[0]?.rating);
                      setReviewText(response.data[0]?.text);
                  }
              } catch (e) {
                console.log(e.message);
              }
        }
        getRatngsReviews();
        
    },[])

  return (
    <div className={styles.ordered_products} >
        <div className={styles.product_container} >
            <img src={props.item.product.image} alt='product image' />
            <div className={styles.details}>
                <div className={styles.product_details}>
                    <h3>{props.item.product.productName}</h3>
                    <p>Price: &#8377; {props.item.product.price} per unit</p>
                    <p>Quantity: {props.item.quantity}</p>
                    </div>
                <div className={styles.status}>Status: {status}</div>
                {props?.item?.status === 'delivered' ?
                <div>
                    <select name="return">
                        <option value="1">Aready purchased</option>
                        <option value="2">Wrong product</option>
                        <option value="4">Damaged Product</option>
                    </select>
                    <span>Return</span>
                </div> : status !== 'canceled'  && !props.item.cancelationRequest && <div onClick={cancelOrder}>Cancel Order</div> }
            </div>
        </div>
        {props?.item?.status === 'delivered' &&
        <div>
            <div className={styles.ratingSection}>
                Rate the product: 
                    <span onClick={()=>{sendRating(1)}}><img src={ ratingValue > 0 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span onClick={()=>{sendRating(2)}}><img src={ ratingValue > 1 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span onClick={()=>{sendRating(3)}}><img src={ ratingValue > 2 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span onClick={()=>{sendRating(4)}}><img src={ ratingValue > 3 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                    <span onClick={()=>{sendRating(5)}}><img src={ ratingValue > 4 ? filledStar : hollowStar} alt='' className={styles.ratingStars} /></span> 
                </div>
            <textarea className={styles.reviewTextArea} type="text" value={reviewText} onChange={(e)=>{setReviewText(e.target.value)}} placeholder='write a review' style={{width: `100%`, height: `100px`}}/>
            <Button value={reviewText === '' ? 'Submit' : 'Update'} action={sendReview} />
        </div>}
    </div>
  )
}
