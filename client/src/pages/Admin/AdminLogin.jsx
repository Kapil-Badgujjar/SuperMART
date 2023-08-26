import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import styles from './AdminLogin.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
export default function AdminLogin() {
  const [password, setPassword] = useState('');
  async function getAdmin(event) {
    event.preventDefault()
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/admin/login', { password: password}, { withCredentials: true});
      console.log(response);
    } catch (error){
      console.log(error.message);
    }
  }
  return (
    <div className={styles.admin_login}>
        <form className={styles.login_form}>
            <h2>Admin</h2>
            <p className={styles.error}>*Wrong id/password</p>
            <input className={styles.input_box} vlaue={password} type='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <Button value="Login" action={getAdmin} />
            <hr />
            <br />
            <Link to="/">Go to main site</Link>
        </form>
    </div>
  )
}
