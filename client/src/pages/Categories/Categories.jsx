import React from 'react'
import styles from './Categories.module.css';

import Clothes from '/categories/Clothes.jpg'
export default function Categories() {
  return (
    <div className={styles.categories_container}>
        <div className={styles.categories_main_div}>
            <h2 className={styles.heading}>Categories</h2>
            <div className={styles.categories}>
                <div style={{ backgroundImage: `url(${Clothes})`, backgroundSize: 'cover' }}>Clothes</div>
                <div>Accessories</div>
                <div>Deodorants</div>
                <div>Footwear</div>
                <div>Electronics</div>
                <div>Smart Gadgets</div>
                <div>Furnitures</div>
                <div>Home Appliences</div>
            </div>
        </div>
    </div>
  )
}
