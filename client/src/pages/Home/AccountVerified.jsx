import React, { useState, useEffect } from 'react'
import styles from './AccountVerified.module.css'
import verified from '/Verified.gif'
import { Link, useNavigate } from 'react-router-dom'
export default function AccountVerified() {
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
            <img className={styles.successImage} src={verified} alt="Success Image" />
            <h1>Your account is verified now</h1>
            <br/>
            <hr/>
            <p>Redirecting to homepage in ... {timeLeft} seconds</p>
            <Link to='/home'>Go to Home</Link>
        </div>
    </div>
  )
}
