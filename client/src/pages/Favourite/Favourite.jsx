import React from 'react'
import styles from './Favourite.module.css'
import Product from '../../components/Product/Product'
export default function Favourite() {
  return (
    <div className={styles.products_container}>
      <br/>
      <h1>Favorite products</h1>
      <br/>
        <div className={styles.products_section}>
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
        </div>
    </div>
  )
}
