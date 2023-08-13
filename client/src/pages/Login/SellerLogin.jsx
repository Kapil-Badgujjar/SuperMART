import React, { useRef, useEffect } from 'react'
import styles from './SellerLogin.module.css'
import Button from '../../components/Button/Button'
import sb from '/bk.jpg'    //background image
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSeller, selectSeller, selectSellerError, selectSellerStatus, logout } from '../../features/seller/sellerSlice'
export default function SellerLogin() {
  const navigate = useNavigate();
  const formReference = useRef(null);
  const dispatch = useDispatch();
  const seller = useSelector(selectSeller);
  const status = useSelector(selectSellerStatus);
  const error = useSelector(selectSellerError);

  async function getSeller(event){
    event.preventDefault();

    //dispatch fetchSeller function with form data
    dispatch(fetchSeller(new FormData(formReference.current)));
  }

  useEffect(() => {
    //get token from the local storage 
    const token = localStorage.getItem('sellerToken');

    //if token found, get the seller details from the server
    

    // set the seller details to seller slice

    
    //redirect to dashboard page 

  },[]);

  useEffect(() => {
    //seller id exists navigate to dashboard page
    if(seller.id) navigate('/sellers/seller-account/dashboard');
  },[seller]);

  return (
    <div style={{background: `url(${sb})`}} className={styles.form_container}>
        <form ref={formReference} className={styles.login_form}>
          <h1>SuperMART Sellers</h1>
          <br />
          <h2>Login to sellers account</h2>
          <p className={styles.error}>{error ? '*'+error:''}</p>
            <input className={styles.input_box} type="text" name="email" placeholder='E-mail id:' />
            <input className={styles.input_box} type="password" name="password" placeholder='Password:' />
          <div className={styles.btn}>
            <Button value="Submit" action={(e) => {getSeller(e)}} />
          </div>

          <Link to="/sellers/forgot-password">Forgot Password</Link>
          <Link to="/sellers/register">Register as Seller</Link>
          <hr />
          <br/>
        </form>
    </div>
  )
}
