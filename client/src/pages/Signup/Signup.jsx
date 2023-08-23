import React, { useRef, useState } from 'react'
import styles from './Signup.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../../api/AxiosPostRequest'
import { testEmail, testPassword, testPhoneNumber } from '../../utils/dataValidator'
export default function Signup() {
  const navigate = useNavigate();
  const formReference = useRef(null);
  const [errorMessage, setErrorMessage] = useState('');
  async function signupFunction(event){
    event.preventDefault();
    const formdata = new FormData(formReference.current);
    if(!formdata.get('name')){
        setErrorMessage('* Please enter a name');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    } else if(!testPhoneNumber(formdata.get('phoneNumber'))){
        setErrorMessage('* Please enter phone number');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }else if(!formdata.get('dateOfBirth')|| formdata.get('dateOfBirth').length !== 10){
        setErrorMessage('* Please enter date of birth');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }else if(!testEmail(formdata.get('email'))){
        setErrorMessage('* Please enter valid email address');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }else if(!testPassword(formdata.get('password'))){
        setErrorMessage('* Enter a strong password [a-zA-Z0-9$!@#...]');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }else if(formdata.get('password') !== formdata.get('confirmPassword')){
        setErrorMessage('* Confirm Password not matched');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    } else if(!formdata.get('gender')){
        setErrorMessage('* Please select a gender');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }else if(!formdata.get('address')){
        setErrorMessage('* Please enter an address');
        setTimeout(() =>{setErrorMessage('')},3000);
        return;
    }
    try{
      const response = await postData('/user/signup', formdata, '');
      if(response.status === 200){
        if(response.data){
          navigate('/login');
        }else {
          setErrorMessage('* '+response.data.message);
          setTimeout(() =>{setErrorMessage('')},3000);
        }
      }else{
        console.log(response.data);
      }
    }catch(err){
      if(err.response.status === 400){
      setErrorMessage('*' + err.response.data.message);
      setTimeout(() =>{setErrorMessage('')},3000);
      }else {
        setErrorMessage('*' + err.message);
        setTimeout(() =>{setErrorMessage('')},3000);
      }
    }

  }

  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
    <form  ref={formReference} className={styles.signup_form}>
      <h1>SuperMART</h1>
      <br />
      <h2>Create a new account</h2>
      <p className={styles.error}>{errorMessage}</p>
      <input className={styles.input_box} type="text" name="name" placeholder='Username:' />
      <input className={styles.input_box} type="text" name="phoneNumber" placeholder='Phone Number:' />
      <input className={styles.input_box} type="date" name="dateOfBirth" placeholder='Date of Birth:' />
      <input className={styles.input_box} type="text" name="email" placeholder='E-mail id:' />
      <input className={styles.input_box} type="password" name="password" placeholder='Password:' />
      <input className={styles.input_box} type="text" name="confirmPassword" placeholder='Confirm Password:' />
      <select className={styles.input_box} name="gender">
        <option label value="">--Select Gender--</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input className={styles.input_box} name="address" placeholder='Permanent address' />
      <div className={styles.btn}>
        <Button 
        value="Submit" 
        action={(e) => {signupFunction(e)}} 
        />
      </div>

      <Link to="/login">Login to your Account</Link>
      <hr />
      <br/>
          <Link to="/sellers/register">Register as Seller</Link>
    </form>
</div>
  )
}
