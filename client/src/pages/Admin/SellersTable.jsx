import React from 'react'
import styles from './SellersTable.module.css'
export default function SellersTable() {
  return (
    <div className={styles.sellers_container}>
      <table className={styles.sellers_table}>
        <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>REGISTRATION_DATE</th>
            <th>NUMBER_PRODUCTS</th>
            <th>IS_ACTIVE</th>
            <th>BLOCKED</th>
        </tr>
        <tr>
            <td>001</td>
            <td>Kapil</td>
            <td>02-11-2022</td>
            <td>9</td>
            <td>true</td>
            <td>false</td>
        </tr>
        <tr>
            <td>001</td>
            <td>Kapil</td>
            <td>02-11-2022</td>
            <td>9</td>
            <td>true</td>
            <td>false</td>
        </tr>
        <tr>
            <td>001</td>
            <td>Kapil</td>
            <td>02-11-2022</td>
            <td>9</td>
            <td>true</td>
            <td>false</td>
        </tr>
      </table>
    </div>
  )
}
