import React, { useEffect, useState } from 'react';
import Product from '../../components/Product/Product';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Category.module.css';
export default function Category() {
  const {category} = useParams('category');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/products/fetch-product-by-category',{category: category}).then((response) => {
      if (response?.status == 200) {
        setProducts(response?.data);
      }
    });
  },[]);
  return (
    <div className={styles.products_container}>
      <br/>
      <h1>{category}</h1>
      <br/>
        <div className={styles.products_section}>
        {products.map(product => {
          return (
            <div key={product.id}>
              <Product product={product}/>
            </div>
          )
        })}
        </div>
    </div>
  )
}
