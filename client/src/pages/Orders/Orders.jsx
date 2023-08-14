import React, { useEffect } from 'react'
import styles from './Orders.module.css'
import OrderedProducts from '../../components/OrderedProducts/OrderedProducts'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectUserDetail } from '../../features/user/userSlice';
export default function Orders() {
  const navigate = useNavigate();
  const user = useSelector(selectUserDetail);
  useEffect(() => {
    if(!user.name) navigate('/login');
  },[]);
  return (
    <div className={styles.orders_container}>
        <div className={styles.orders}>
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
        </div>
    </div>
  )
}
