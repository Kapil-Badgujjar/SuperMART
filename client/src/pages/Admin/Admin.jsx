import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import styles from './Admin.module.css'
export default function Admin() {
  return (
    <div className={styles.admin_panel}>
        <div className={styles.navbar_container}>
          <div className={styles.navbar}>
            <Link to='/admin/panel/sellers-list'>Sellers</Link>
            <Link to='/admin/panel/products-list'>Products</Link>
            <Link to='/admin/panel/Customers-list'>Customers</Link>
            <spna>Logout</spna>
          </div>
        </div>
        <div><Outlet /></div>
    </div>
  )
}
