import React from 'react'
import styles from './style.module.css';
import bannerImage from '/welcome/fashion_trends.jpg';
export default function Banner2() {
  return (
    <div className={styles.banner2}>
        <img src={bannerImage} alt="Axe" />
        <div className={styles.banner2_white_text}>
            Latest Trending Fashion
        </div>
        <div className={styles.banner2_text}>
            Latest Trending Fashion
        </div>
    </div>
  )
}
