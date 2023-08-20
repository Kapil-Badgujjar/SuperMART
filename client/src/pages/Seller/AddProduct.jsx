import React, {useEffect, useRef, useState} from 'react'
import styles from './AddProduct.module.css'
import Button from '../../components/Button/Button'
import { postData } from '../../api/AxiosPostRequest';
import { useSelector } from 'react-redux';
import { selectSeller } from '../../features/seller/sellerSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
export default function AddProducts() {
  const [otherSpecs, setOtherSpecs] = useState(false)
  const formReference = useRef(null);
  const navigate = useNavigate();
  const seller = useSelector(selectSeller);
  function removeToEmptyKeys( formData ) {
    const keysToDelete = [];
    for( const key of formData.keys() ) {
      const value = formData.get(key);
      if(value === '')
      {
        keysToDelete.push(key);
      }
    }

    for( const key of keysToDelete ) {
      formData.delete(key);
    }
    return formData;
  }

  async function addProduct(event){
    event.preventDefault();
    const formData = removeToEmptyKeys(new FormData(formReference.current));
    formData.append('sellerId', seller.id);
    const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS+'/products/add-new-product', formData, {
      withCredentials: true,
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log(response);
  }

  useEffect(()=>{
    if(!seller.id) navigate('/sellers/login');
  },[])

  return (
    <div className={styles.add_product_container}>
      <form ref={formReference} className={styles.add_product_form}>
        <input className={styles.add_product_input_box} type='text' name="productName" placeholder='Product name' />
        <input className={styles.add_product_input_box} type='number' name="price" placeholder='Product price' />
        <input className={styles.add_product_input_box} type='number' name="stocks" placeholder='Available Stock' />
        <input className={styles.add_product_input_box} type='offer' name="offer" placeholder='Offer (%)' />
        {/* <input className={styles.add_product_input_box} type='text' name="category" placeholder='Product category' /> */}
        <select className={styles.add_product_input_box} name="category" >
          <option value="Others" disabled >--- Select Category ---</option>
          <option value="Electronics">Electronics</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Smart Gadgets">Smart Gadgets</option>
          <option value="Laptops">Laptop</option>
          <option value="Clothes">Clothes</option>
          <option value="Deodorants">Deodorants</option>
          <option value="Footwear">Footwear</option>
          <option value="Accessories">Accessories</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Home Appliences">Home Appliences</option>
          <option value="Furniture">Furniture</option>
          <option value="Others">Others</option>
        </select>
        <textarea className={styles.add_product_textarea} type='text' name="description" placeholder='Product description' />
        <div><label>Choose product image: </label><input className={styles.add_product_input_box} type='file' name="productImage" /></div>
        <div>
          <p>Some instructions for better product display</p>
          <ul className={styles.instructions}>
            <li>Choose an image with aspect ratio 1:1</li>
            <li>If possible, make background white</li>
            <li>Picture should be clear</li>
            <li>Object must be shown clear</li>
            <li>Use high resolution image if possible</li>
            <li>*File size must be less than 500kb</li>
          </ul>
        </div>
        <p onClick={()=>{setOtherSpecs(prev => !prev)}} className={styles.other_specs_btn}>Other specs</p>
        {otherSpecs && <div className={styles.other_specs}>
            <input className={styles.add_product_input_box} type='text' name="color" placeholder='color' />
            <input className={styles.add_product_input_box} type='number' name="size" placeholder='size' />
            <input className={styles.add_product_input_box} type='text' name="ram" placeholder='Ram' />
            <input className={styles.add_product_input_box} type='text' name="storage" placeholder='Storage' />
            <input className={styles.add_product_input_box} type='text' name="camera" placeholder='Camera' />
            <input className={styles.add_product_input_box} type='text' name="charger" placeholder='Charger' />
            <input className={styles.add_product_input_box} type='text' name="network" placeholder='Network' />
            <input className={styles.add_product_input_box} type='text' name="display" placeholder='Display' />
            <input className={styles.add_product_input_box} type='text' name="battery" placeholder='Battery' />
        </div> }
        <Button value="Add Product" action={(e)=>{addProduct(e)}} />
        <p>Support for *custom specs coming soon!</p>
        <p>Planned to add in house image cropping facility - will be available soon...</p>
      </form>
    </div>
  )
}
