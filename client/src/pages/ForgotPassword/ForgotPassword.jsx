import React from 'react'
import styles from './ForgotPassword.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link } from 'react-router-dom'
export default function ForgotPassword() {
  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form className={styles.forgot_password_form}>
          <h1>SuperMART</h1>
          <br />
          <h2>Forgot Password</h2>
          <p className={styles.error}>*Error Message show here</p>
          <input className={styles.input_box} type="text" name="userid" placeholder='E-mail id:' />
          <div className={styles.btn}>
            <Button value="Submit" onClick={() => {}} />
          </div>

          <Link to="/login">Login to your Account</Link>
          <Link to="/signup">Create New Account</Link>
        </form>
    </div>
  )
}