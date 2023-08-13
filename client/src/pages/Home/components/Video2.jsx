import React from 'react'
import styles from './videostyles.module.css';
import promo from '/video/skincare.mp4';
export default function Video2() {
  return (
    <div className={styles.video1}>
        <div className={styles.v2text}>
            Skin care is important, Checkout essential skincare products
        </div>
        <video className={styles.v1v} src={promo} muted  autoPlay loop>
            Your Browser does't support embeded videos
        </video>
    </div>
  )
}
