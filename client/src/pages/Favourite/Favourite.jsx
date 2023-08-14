import React, { useEffect } from 'react'
import styles from './Favourite.module.css'
import Product from '../../components/Product/Product'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { selectUserDetail } from '../../features/user/userSlice';
export default function Favourite() {
  const navigate = useNavigate();
  const user = useSelector(selectUserDetail);

  useEffect(()=>{
    if(!user.id) navigate('/login');
  },[])

  return (
    <div className={styles.products_container}>
      <br/>
      <h1>Favorite products</h1>
      <br/>
        <div className={styles.products_section}>
            {/* <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product /> */}
        </div>
    </div>
  )
}
