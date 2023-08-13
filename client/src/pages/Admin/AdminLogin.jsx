import React from 'react'
import Button from '../../components/Button/Button'
import styles from './AdminLogin.module.css'
import { Link } from 'react-router-dom'
export default function AdminLogin() {
  return (
    <div className={styles.admin_login}>
        <form className={styles.login_form}>
            <h2>Admin Login</h2>
            <p className={styles.error}>*Wrong id/password</p>
            <input className={styles.input_box} type='text' placeholder="Id" />
            <input className={styles.input_box} type='password' placeholder="Password" />
            <Button value="Login" action={()=>{}} />

            <hr />
            <br />
            <Link to="/">Go to main site</Link>
        </form>
    </div>
  )
}
