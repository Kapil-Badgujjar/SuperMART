import React from 'react'
import styles from './SellerForgotPassword.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link } from 'react-router-dom'
export default function SellerForgotPassword() {
  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form className={styles.forgot_password_form}>
          <h1>SuperMART sellers</h1>
          <br />
          <h2>Forgot Password</h2>
          <p className={styles.error}>*Error Message show here</p>
          <input className={styles.input_box} type="text" name="userid" placeholder='E-mail id:' />
          <div className={styles.btn}>
            <Button value="Submit" onClick={() => {}} />
          </div>

          <Link to="/sellers/login">Login to your Account</Link>
          <br />
          <hr />
        </form>
    </div>
  )
}