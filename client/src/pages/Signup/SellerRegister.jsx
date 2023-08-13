import React, { useRef } from 'react'
import styles from './SellerRegister.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link } from 'react-router-dom'
import { postData } from '../../api/AxiosPostRequest'
export default function SellerRegister() {
  const formReference = useRef(null);

  async function sellerRegister(event){
    event.preventDefault();
    const formData = new FormData(formReference.current);
    formData.delete("confirmPassword");
    const response = await postData('/sellers/register', formData, '');
    console.log(response);
  }

  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
    <form ref={formReference} className={styles.signup_form}>
      <h1>SuperMART sellers</h1>
      <br />
      <h2>Register as Seller</h2>
      <p className={styles.error}>*Error Message show here</p>
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
