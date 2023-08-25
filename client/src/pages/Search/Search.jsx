import React, { useEffect, useState} from 'react'
import styles from './Search.module.css'
import axios from 'axios';
import SearchedProduct from '../../components/SearchedProducts/SearchedProduct'
import { useNavigate } from 'react-router-dom';
export default function Search() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [pattern, setPattern] = useState("");

  useEffect(()=>{
    window.scrollTo(0, 0);
    if(pattern.trim() === '') {
      setProducts([]);
      return;
    }
    try{
      axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/products/search-product', {pattern}, { withCredentials: true, headers: { "Authorization": "Bearer"}}).then((response) => {
        if(response.status == 200 ){
          console.log(response.data);
          setProducts(response.data)
        }
      })
    } catch(error){
      console.log(error);
    }
  },[pattern])
  return (
    <div className={styles.search_container}>
        <div className={styles.search_div}>
          <div className={styles.search_box}>
            <input type="text" value={pattern} placeholder="Search products" onChange={(e)=>{setPattern(e.target.value)}}/>
          </div>
          <div className={styles.products_list}>
            {products.map((product)=>{
              return (
                <div key={product.id} onClick={()=>{navigate(`/product/${product.id}`)}}>
                  <SearchedProduct product={product} />
                </div>
              )
            })}
          </div>
        </div>
    </div>
  )
}
