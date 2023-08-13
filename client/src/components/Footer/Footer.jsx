import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'
export default function Footer() {
  return (
    <div className={styles.footer_container}>
        <div className={styles.footer}>
            <div className={styles.footer_up}>
                <div className={styles.c1}>
                    <span>Site Map</span>
                    <Link to='/home'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact</Link> 
                    <Link to='/career'>Career</Link> 
                    <Link to='/help'>Help</Link>
                </div>
                <div className={styles.c2}>
                <span>Featured</span>
                    <Link to='/home'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact</Link> 
                    <Link to='/career'>Career</Link> 
                    <Link to='/help'>Help</Link>
                </div>
                <div className={styles.c3}>
                <span>Owner</span>
                    <Link to='/home'>Home</Link>
                    <Link to='/about'>About</Link>
                    <Link to='/contact'>Contact</Link> 
                    <Link to='/career'>Career</Link> 
                    <Link to='/help'>Help</Link>
                </div>
            </div>
            <div className={styles.footer_down}></div>
        </div>
    </div>
  )
}
