import React, { useState, useEffect } from 'react'
import styles from './FailedOrder.module.css'
import failedImage from '/PaymentFailed.webp'
import { Link, useNavigate } from 'react-router-dom'
export default function FailedOrder() {
    const navigate = useNavigate();
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
    <div className={styles.FailedPage}>
        <div className={styles.FailedMessageContainer}>
            <img className={styles.failedImage} src={failedImage} alt="Success Image" />
            <h1>Payment failed!</h1>
            <p>You can try again to make payment.</p>
            <p>Facing any problem? Please provide feedback.</p>
            <br/>
            <hr/>
            <p>Redirecting to homepage in ... {timeLeft} seconds</p>
            <Link to='/home'>Go to Home</Link>
        </div>
    </div>
  )
}
