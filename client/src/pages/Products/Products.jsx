import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import styles from "./Products.module.css";
import axios from "axios";
export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/products/fetch-all-product').then((response) => {
      if (response?.status == 200) {
        setProducts(response?.data);
      }
    });
  }, []);
  return (
    <div className={styles.products_container}>
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
  );
}
