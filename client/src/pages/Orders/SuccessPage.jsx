import React, { useState, useEffect } from 'react'
import styles from './SuccessPage.module.css'
import orderSuccessImage from '/orderSuccess.gif'
import { Link, useNavigate } from 'react-router-dom'
export default function SuccessPage() {
    const navigate = useNavigate()
    const [timeLeft, setTimeLeft] = useState(10);
    useEffect(() => {
        let i =10;
        const intervalId = setInterval(()=>{
            setTimeLeft(i);
            if(i === 0) {
                clearInterval(intervalId);
                navigate('/home');
            }
            i--;
        },1000);

    },[]);
  return (
    <div className={styles.SuccessPage}>
        <div className={styles.SuccessMessageContainer}>
            <img className={styles.successImage} src={orderSuccessImage} alt="Success Image" />
            <h1>Order Successfull!</h1>
            <p>We will deliver you products as soon as posible.</p>
            <p>Hope you enjoyed the shopping. Please rate the products you purchased after delivery of the products.</p>
            <br/>
            <hr/>
            <p>Redirecting to homepage in ... {timeLeft} seconds</p>
            <Link to='/home'>Go to Home</Link>
        </div>
    </div>
  )
}
