import React, { useState, useEffect } from 'react'
import styles from './ForgotPassword.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserDetail } from '../../features/user/userSlice'
import axios from 'axios'
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const user = useSelector(selectUserDetail);

  async function forgotPasswordFun(event){
    event.preventDefault();
    try{
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/user/forgot-password', { email: email },{withCredentials: true});
      if(response.status === 200) {
        alert('We have sent a password reset link to your email, Check your inbox');
        console.log(response.data);
      }
    }catch(error){
      if(error.response.status === 400) {
        setErrorMessage(error.response.data.message);
        setTimeout(function(){ setErrorMessage('')},3000);
      }
    }
  }

  useEffect(()=>{
    if(user?.id){
      navigate('/home')
    }
  },[])
  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form className={styles.forgot_password_form}>
          <h1>SuperMART</h1>
          <br />
          <h2>Forgot Password</h2>
          <p className={styles.error}>{errorMessage}</p>
          <input className={styles.input_box} type="text" value={email} name="email" placeholder='E-mail id:' onChange={(e)=>{setEmail(e.target.value)}} />
          <div className={styles.btn}>
            <Button value="Submit" action={forgotPasswordFun} />
          </div>
          <br/>
          <hr/>
          <Link to="/login">Login to your Account</Link>
          <Link to="/signup">Create New Account</Link>
        </form>
    </div>
  )
}