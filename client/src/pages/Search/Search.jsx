import React from 'react'
import styles from './Search.module.css'
import SearchedProduct from '../../components/SearchedProducts/SearchedProduct'
export default function Search() {
  return (
    <div className={styles.search_container}>
        <div className={styles.search_div}>
          <div className={styles.search_box}>
            <input type="text" placeholder="Search products" />
          </div>
          <div className={styles.products_list}>
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
             <SearchedProduct />
          </div>
        </div>
    </div>
  )
}
