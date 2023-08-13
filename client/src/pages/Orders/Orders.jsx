import React from 'react'
import styles from './Orders.module.css'
import OrderedProducts from '../../components/OrderedProducts/OrderedProducts'
export default function Orders() {
  return (
    <div className={styles.orders_container}>
        <div className={styles.orders}>
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
          <OrderedProducts />
        </div>
    </div>
  )
}
