import React from 'react'
import styles from './style.module.css';
import bannerImage from '/welcome/sneakers.jpg';
export default function Banner3() {
  return (
    <div className={styles.banner3}>
        <img src={bannerImage} alt="sneakers" />
        <div className={styles.banner3_text}>Trending Sneakers</div>
    </div>
  )
}
