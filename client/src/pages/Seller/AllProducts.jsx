import React, { useEffect, useState } from 'react'
import styles from './AllProducts.module.css'
import axios from 'axios';
import Product from './components/product';
export default function AllProducts() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const accessToken = localStorage.getItem('sellerToken');
        console.log(accessToken);
        async function loadProducts() {
                try{
                    const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/sellers/get-my-products', {
                        withCredentials: true,
                        headers: {
                            "Authorization": "Bearer " + accessToken
                        }
                    })
                    setProducts(response.data);
                } catch (error) {
                    console.log(error);
                }
        }
        loadProducts();
    },[]);
  return (
    <div className={styles.all_products}>
      {
        products.map((product) => {
            return (
                <div key={product.id}>
                    <Product product={product} />
                </div>
            )
        })
      }
    </div>
  )
}
