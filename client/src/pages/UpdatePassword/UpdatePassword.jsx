import React, { useEffect, useState} from 'react'
import styles from './UpdatePassword.module.css'
import Button from '../../components/Button/Button'
import axios from 'axios'
import sb from '/bk.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { testPassword } from '../../utils/dataValidator'
export default function UpdatePassword() {
  const navigate = useNavigate();
  const {token} = useParams('token');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  async function resetPassword(event){
    event.preventDefault();
    if(!testPassword(password)){
      setErrorMessage("* Enter a strong password [a-zA-Z0-9$!@#..]")
      return;
    } else if(password !== confirmPassword){
      setErrorMessage('* Confirm Password not matched');
      return;
    }
    try {
      const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/user/reset-password', {token: token, newPassword: password}, {withCredentials : true});
      if(response.status == 200){
        alert('Password reset successful, login to your account');
        navigate('/login');
      }
      console.log(response);
    } catch (error) {
      if(error.response.status == 400 || error.response.status == 500){
        setErrorMessage(error.response.data.message);
        setTimeout(()=>{ setErrorMessage('')},3000);
      }
      console.log(error.message);
    }
  }

  useEffect(() =>{
    if(!token) navigate('/login');
  },[])
  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form className={styles.update_password_form}>
          <h1>SuperMART</h1>
          <br />
          <h2>Reset Password</h2>
          <p className={styles.error}>{errorMessage}</p>
          <input className={styles.input_box} value={password} type="password" name="password" placeholder='New Password:' onChange={(e)=>{setPassword(e.target.value)}}/>
          <input className={styles.input_box} value={confirmPassword} type="text" name="confirm_password" placeholder='Confirm Password:' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
          <div className={styles.btn}>
          <span>Cancel</span>
            <Button value="Submit" action={resetPassword} />
          </div>
          <br/>
          <hr/>
          <Link to='/login'>Go back to Login</Link>
        </form>
    </div>
  )
}