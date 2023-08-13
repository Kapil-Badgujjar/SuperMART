import React from 'react'
import styles from './UpdatePassword.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link } from 'react-router-dom'
export default function UpdatePassword() {
  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form className={styles.update_password_form}>
          <h1>SuperMART</h1>
          <br />
          <h2>Update Password</h2>
          <p className={styles.error}>*Error Message show here</p>
          <input className={styles.input_box} type="passowrd" name="password" placeholder='New Password:' />
          <input className={styles.input_box} type="text" name="confirm_password" placeholder='Confirm Password:' />
          <div className={styles.btn}>
          <span>Cancel</span>
            <Button value="Submit" onClick={() => {}} />
          </div>
          <Link to='/login'>Go back to Login</Link>
        </form>
    </div>
  )
}
