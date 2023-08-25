import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <div className={styles.footer_container}>
        <div className={styles.footer}>
            <div className={styles.footer_up}>
                <div className={styles.c1}>
                    <span>Importan Links</span>
                    <Link to='/home'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/sellers/login'>Seller Login</Link> 
                    <Link to='/career'>Career</Link> 
                    <Link to='/help'>Help</Link>
                </div>
                <div className={styles.c2}>
                <span>Featured</span>
                    <Link to='/home'>SuperMART Welcome page</Link>
                    <Link to='/admin/'>Admin</Link>
                    <Link to='/sellers'>Sellers</Link> 
                    <Link to='/products'>All products</Link> 
                    <Link to='/help'>Help</Link>
                </div>
                <div className={styles.c3}>
                <span>Owner</span>
                    <Link>Name: Kapil</Link>
                    <Link>Mobile: +91-7988220911</Link>
                    <Link>Email: kapilbadgujjar99@gmail.com</Link> 
                    <a href="https://portfolio-website-ten-sable.vercel.app/">My Portfolio Website</a> 
                    <Link>Request for admin access</Link>
                </div>
            </div>
            <div className={styles.footer_down}></div>
        </div>
    </div>
  )
}
