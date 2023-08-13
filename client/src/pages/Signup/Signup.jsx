import React, { useRef } from 'react'
import styles from './Signup.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'
import { Link } from 'react-router-dom'
import { postData } from '../../api/AxiosPostRequest'
export default function Signup() {
  const formReference = useRef(null);

  async function signupFunction(event){
    event.preventDefault();
    const formdata = new FormData(formReference.current);
    const response = await postData('/user/signup', formdata, '');
    console.log(response.data);
  }

  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
    <form  ref={formReference} className={styles.signup_form}>
      <h1>SuperMART</h1>
      <br />
      <h2>Create a new account</h2>
      <p className={styles.error}>*Error Message show here</p>
      <input className={styles.input_box} type="text" name="name" placeholder='Username:' />
      <input className={styles.input_box} type="text" name="phoneNumber" placeholder='Phone Number:' />
      <input className={styles.input_box} type="date" name="dateOfBirth" placeholder='Date of Birth:' />
      <input className={styles.input_box} type="text" name="email" placeholder='E-mail id:' />
      <input className={styles.input_box} type="password" name="password" placeholder='Password:' />
      <input className={styles.input_box} type="text" name="confirmPassword" placeholder='Confirm Password:' />
      <select className={styles.input_box} name="gender">
        <option label>--Select Gender--</option>
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
