import React from 'react'
import styles from './videostyles.module.css';
import promo from '/video/ecompromo.mp4';
export default function Video1() {
  return (
    <div className={styles.video1}>
      <div className={styles.v1text}>
        Sale is Live
      </div>
        <video className={styles.v1v} src={promo} muted  autoPlay loop>
            Your Browser does't support embeded videos
        </video>
        <div className={styles.v1text}>
            Top Class Products available Exclusively
        </div>
    </div>
  )
}
