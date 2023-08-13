import React from 'react'
import styles from './Category.module.css';
import Product from '../../components/Product/Product';
export default function Category() {
  return (
    <div className={styles.products_container}>
      <br/>
      <h1>Category name</h1>
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
