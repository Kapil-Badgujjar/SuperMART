import React, { useState, useEffect } from 'react'
import styles from './About.module.css'
import reactimage from '/technology/react.png';
import axios from '/technology/axios.svg';
import react_router from '/technology/react_router.png';
import redux from '/technology/redux.png';
import css3 from '/technology/css3.png';
import nodejs from '/technology/node.png';
import sendgridimage from '/technology/sendgrid.png';
import jwtimage from '/technology/jwt.png';
import passportimage from '/technology/passport.png';
import firebase from '/technology/firebase.png';
import prismaimage from '/technology/prisma.png';
import monogodbimage from '/technology/mongo.png';
import stripeImage from '/technology/stripe.png';
export default function About() {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[]);
  
  return (
    <div className={styles.about_container}>
        <div className={styles.about_div}>
        {showMessage && <div className={styles.msg_from_dev}>
             <div className={styles.msg_heading}> <h2>A message from Developer</h2> <h2 className={styles.msg_close} onClick={()=>{setShowMessage(prev => !prev)}}>&times;</h2></div>
            <p>Hello...</p>
            <p>I'm a Full-stack web developer and I hope you liked my work on SuperMART. I would greatly appreciate your feedback on the application. Please email me at  <a href="mailto:kapilbadgujjar99@gmail.com">kapilbadgujjar99@gmail.com</a>.</p>
            <p>Your response is invaluable to me as it will help me enhance both the application and my skills. Thank you for your time.</p>
            <p>
              Best regards,<br />
              Kapil
            </p>
          </div> }
          <div className={styles.about}>
            <h2>
              About SuperMART
            </h2>
            <p>
              SuperMART is a modern E Commerce web application. It provides a great user experience and attractive user interface to its users. Main features of the SuperMART includes<br/>
            </p>
            <br/>
              <ul className={styles.main_features}>
                <li>Homepage to display ongoing sale and offers and other events.</li>
                <li>Browsing products by category</li>
                <li>Searching facility</li>
                <li>User cart.</li>
                <li>Sellers Dashboard</li>
                <li>Admin Panel  and many more</li>
              </ul>
              <br/>
              Its backend is written in NodeJS that is a powerful server enviroment.

          </div>
          <div>
            <div className={styles.details}>
              <h2>Technology Used</h2>
              <div className={styles.images}>
                  <img src={reactimage} alt="react image" />
                  <img src={axios} alt="axios image" />
                  <img src={react_router} alt="react image" />
                  <img src={redux} alt="redux image" />
                  <img src={css3} alt="css3 image" />
                  <img src={nodejs} alt="nodejs image" />
                  <img src={sendgridimage} alt="sendgrid image" />
                  <img src={firebase} alt="firebase image" />
                  <img src={jwtimage} alt="jwt image" />
                  {/* <img src={passportimage} alt="passport image" /> */}
                  <img src={prismaimage} alt="prisma image" />
                  <img src={monogodbimage} alt="mongodb image" />
                  <img src={stripeImage} alt="stripe image" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
