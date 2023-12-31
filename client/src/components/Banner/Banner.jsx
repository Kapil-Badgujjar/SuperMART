import React from 'react'
import styles from './Banner.module.css'
import bannerImage from '/SuperMARTBanner.jpg';
import bannerImage1 from '/SuperMARTBanner2.jpg';
export default function Banner() {
  return (
    <div className={styles.banner_container}>
        <div className={styles.banner}>
            <img className={styles.image1} src={bannerImage} alt='banner image' />
            <img className={styles.image2} src={bannerImage1} alt='banner image' />
        </div>
    </div>
  )
}
