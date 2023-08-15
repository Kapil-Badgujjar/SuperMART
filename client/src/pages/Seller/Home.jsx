import React from 'react'
import styles from './Home.module.css'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logout } from "../../features/seller/sellerSlice";
import axios from 'axios';
export default function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function logoutFun() {
        const token = localStorage.getItem('sellerRefreshToken');
        const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/sellers/logout',
        {
            withCredentials: true,
            headers: {
                "Authorization": "Bearer " + token
            }
        });
        if(response.status === 200){
            localStorage.removeItem('sellerToken');
            localStorage.removeItem('sellerRefreshToken');
            dispatch(logout());
            navigate('/');
        }
    }
  return (
    <div className={styles.seller_container}>
        <div className={styles.top}>
            <div className={styles.navbar}>
                <div>SuperMART sellers</div><div>Sellers Dashboard</div><div onClick={logoutFun}>Logout</div>
            </div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.left}>
                {/* <h1>SuperMART</h1> */}
                <ul>
                    <li><Link to='/sellers/seller-account/dashboard'>Dashboard</Link></li>
                    <li><Link to='/sellers/seller-account/add-product'>Add Products</Link></li>
                    <li><Link to='/sellers/seller-account/all-products'>All Products</Link></li>
                    <li><Link to='/sellers/seller-account/orders'>Orders</Link></li>
                    {/* <li><Link >Logout</Link></li> */}
                </ul>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    </div>
  )
}
