import React, { useRef, useState } from 'react'
import styles from './SellerRegister.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../../api/AxiosPostRequest'
import { testEmail, testPassword, testPhoneNumber } from '../../utils/dataValidator'
export default function SellerRegister() {
  const navigate = useNavigate();
  const formReference = useRef(null);
  const [errorMessage, setErrorMessage] = useState();
  async function sellerRegister(event){
    event.preventDefault();
    const formData = new FormData(formReference.current);
    if(!formData.get('name')){
        setErrorMessage('* Please enter a name');
        return;
    } else if(!testPhoneNumber(formData.get('phoneNumber'))){
        setErrorMessage('* Please enter phone number');
        return;
    }else if(!testEmail(formData.get('email'))){
        setErrorMessage('* Please enter valid email address');
        return;
    }else if(!testPassword(formData.get('password'))){
        setErrorMessage('* Enter a strong password [a-zA-Z0-9$!@#..');
        return;
    }else if(formData.get('password') !== formData.get('confirmPassword')){
        setErrorMessage('* Confirm Password not matched');
        return;
    }
    formData.delete("confirmPassword");
    try{
      const response = await postData('/sellers/register', formData, '');
      if(response.status === 200){
        if(response.data.isValid){
          navigate('/sellers/login');
        }else{
          setErrorMessage(response.data.message);
        }
        console.log(response);
      }
    }catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
    <form ref={formReference} className={styles.signup_form}>
      <h1>SuperMART sellers</h1>
      <br />
      <h2>Register as Seller</h2>
      <p className={styles.error}>{errorMessage}</p>
      <input className={styles.input_box} type="text" name="name" placeholder='Username:' />
      <input className={styles.input_box} type="number" name="phoneNumber" placeholder='Phone Number:' />
      <input className={styles.input_box} type="email" name="email" placeholder='E-mail id:' />
      <input className={styles.input_box} type="password" name="password" placeholder='Password:' />
      <input className={styles.input_box} type="text" name="confirmPassword" placeholder='Confirm Password:' />
      <div className={styles.btn}>
        <Button value="Submit" action={(e) => {sellerRegister(e)}} />
      </div>

      <Link to="/sellers/login">Login to your Account</Link>
      <hr />
    </form>
</div>
  )
}
