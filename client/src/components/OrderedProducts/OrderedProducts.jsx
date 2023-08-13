import React from 'react'
import pimg from '/apple_watch.png'
import styles from './OrderedProducts.module.css'
export default function OrderedProducts() {
    let purchased = true;
  return (
    <div className={styles.ordered_products} >
        <div className={styles.product_container} >
            <img src={pimg} alt='product image' />

            <div className={styles.details}>
                <div className={styles.product_details}>
                    <h3>Product Name: Smart Apple Watch</h3>
                    <p>&#8377; 34999</p>
                    <p>Quantity: 5</p>
                    </div>
                <div className={styles.status}>Status: Out for delivery</div>
                {purchased ?
                <div>
                    <select name="return">
                        <option value="1" selected>Aready purchased</option>
                        <option value="2" >Wrong product</option>
                        <option value="4" >Damaged Product</option>
                    </select>
                    <span>Return</span>
                </div>: <div>Request to cancel</div>}
            </div>
        </div>
        {purchased &&
        <div>
            <div>Rate the product: <select name='ratings'>
                <option value='1' >1</option>
                <option value='2'>2</option>
                <option value='3'selected>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                </select></div>
            <textarea type="text" placeholder='write a review' style={{width: `100%`, height: `100px`}}/>
            <button>Submit</button>
        </div>}
    </div>
  )
}
