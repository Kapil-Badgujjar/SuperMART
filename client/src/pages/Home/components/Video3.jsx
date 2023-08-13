import React from 'react'
import styles from './videostyles.module.css';
import promo from '/video/perfume.mp4';
export default function Video3() {
  return (
    <video  className={styles.v3v} src={promo} width="100%"  height="50%" muted  autoPlay loop>
        Your Browser does't support embeded videos
    </video>
  )
}