import React from "react";
import styles from './Dashboard.module.css';
export default function Dashboard() {
  return (
    <>
      <div className={styles.financial_info}>
        <div>Total Revenue</div>
        <div>Last month Revenue</div>
        <div>Average Sellers Revenue</div>
        <div>Transient orders ammount</div>
        <div>Extras</div>
      </div>
      <div className={styles.products_info}>
        <div className={styles.graph}> Under Development</div>
        <div className={styles.stocks_info}>
          <div className={styles.most_sold_item}>Most sold product</div>
          <div className={styles.most_sold_item}>Products and Stocks</div>
        </div>
      </div>
    </>
  );
}
