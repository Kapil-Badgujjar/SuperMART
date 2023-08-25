import React, { useEffect, useState } from 'react'
import styles from './Orders.module.css'
import axios from 'axios'
import OrderedProducts from '../../components/OrderedProducts/OrderedProducts'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { selectUserDetail } from '../../features/user/userSlice';
export default function Orders() {
  const navigate = useNavigate();
  const user = useSelector(selectUserDetail);
  const [orderedItems, setOrderedItems] = useState([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    if(!user.name) { navigate('/login'); return; }
    const token = localStorage.getItem('userToken');
    async function getOrders(){
      try {
        const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/user/orders',
        {
          withCredentials: true,
          headers: { "Authorization": "Bearer " + token}
        });
        if(response.status === 200){
          setOrderedItems(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    }
    getOrders();
  },[]);
  return (
    <div className={styles.orders_container}>
        <div className={styles.orders}>
          {
            orderedItems.map((item) => {
              return (
                <div key={item.id} >
                  <OrderedProducts item={item} />
                </div>
              )
            })
          }
        </div>
    </div>
  )
}
