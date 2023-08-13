import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './Root.module.css'
export default function Root() {
  return (
    <div>
      <div><Navbar /></div>
      <div className={styles.navbar_space}></div>
      <div><Outlet /></div>
      <div><Footer /></div>
    </div>
  )
}
