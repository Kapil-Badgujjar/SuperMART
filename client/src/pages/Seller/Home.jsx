import React from 'react'
import styles from './Home.module.css'
import { Link, Outlet } from 'react-router-dom';
export default function Home() {

  return (
    <div className={styles.seller_container}>
        <div className={styles.top}>
            <div className={styles.navbar}>
                <div>SuperMART sellers</div><div>Sellers Dashboard</div><div>Logout</div>
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
                    <li><Link >Logout</Link></li>
                </ul>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    </div>
  )
}
