import React from 'react'
import styles from './style.module.css';
import bannerImage from '/welcome/Axe.jpg';
export default function Banner1() {
  return (
    <div className={styles.banner1}>
        <div className={styles.banner1_text}>
            Most Powerful and Strong Deodorant in the Market.
        </div>
        <img src={bannerImage} alt="Axe" />
        <div className={styles.banner1_white_text}>
            Most Powerful and Strong Deodorant in the Market.
        </div>
    </div>
  )
}
