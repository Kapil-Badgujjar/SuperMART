import React, { useState } from 'react'
import Button from '../../components/Button/Button'
import styles from './AdminLogin.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login, logout } from '../../features/admin/adminSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function AdminLogin() {
  const navigate = useNavigate();
  const dispath = useDispatch();
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMessage] = useState(undefined);
  async function getAdmin(event) {
    event.preventDefault()
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/admin/login', { password: password}, { withCredentials: true});
      dispath(login());
      if(response.status === 200){
        
        navigate('/admin/dashboard');
      }
      console.log(response);
    } catch (error){
      setErrorMessage(error.message);
      setTimeout(()=> {setErrorMessage(undefined);},3000);
    }
  }
  return (
    <div className={styles.admin_login}>
        <form className={styles.login_form}>
            <h2>Admin Login</h2>
            <p className={styles.error}>{errorMsg && '*Wrong id/password'}</p>
            <input className={styles.input_box} vlaue={password} type='password' placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}} />
            <Button value="Login" action={getAdmin} />
            <hr />
            <br />
            <Link to="/">Go to main site</Link>
        </form>
    </div>
  )
}
