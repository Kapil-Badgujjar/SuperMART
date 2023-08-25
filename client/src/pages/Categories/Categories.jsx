import React from 'react'
import styles from './Categories.module.css';

import Clothes from '/categories/Clothes.jpg'
import { useNavigate } from 'react-router-dom';
export default function Categories() {

  return (
    <div className={styles.categories_container}>
        <div className={styles.categories_main_div}>
            <h2 className={styles.heading}>Categories</h2>
            <div className={styles.categories}>
                {/* <div onClick={()=>{navigate('/category/Electronics')}} style={{ backgroundImage: `url('https://cdn.rohde-schwarz.com/pws/solution/electronic_design/power_electronics/Electronic-design-power-conversion-rohde-schwarz_stage_2880x_w1280_hX.jpg')`, backgroundSize: `cover`}}>Electronics</div> */}
                <div onClick={()=>{navigate('/category/Mobile')}} style={{ backgroundImage: `url('https://fdn.gsmarena.com/imgroot/static/headers/makers/samsung-2023-1.jpg')`, backgroundSize: `cover`}}>Mobile</div>
                <div onClick={()=>{navigate('/category/Smart Gadgets')}} style={{ backgroundImage: `url('https://images.ctfassets.net/16nm6vz43ids/28tFhufn7kWpDrvyiztFS1/c0ae674568ef3e27ef3d62c60607830a/Surprising_things_Alexa_Google_Home_can_do.png')`, backgroundSize: 'cover'}}>Smart Gadgets</div>
                <div onClick={()=>{navigate('/category/Laptops')}} style={{ backgroundImage: `url('https://www.91-cdn.com/hub/wp-content/uploads/2022/07/Top-laptop-brands-in-India.jpg')`, backgroundSize: 'cover'}}>Laptops</div>
                <div onClick={()=>{navigate('/category/Clothes')}} style={{ backgroundImage: `url(${Clothes})`, backgroundSize: 'cover' }}>Clothes</div>
                <div onClick={()=>{navigate('/category/Deodorants')}} style={{ backgroundImage: `url($(#))`}}>Deodorants</div>
                <div onClick={()=>{navigate('/category/Footwear')}} style={{ backgroundImage: `url($(#))`}}>Footwear</div>
                <div onClick={()=>{navigate('/category/Accessories')}} style={{ backgroundImage: `url($(#))`}}>Accessories</div>
                <div onClick={()=>{navigate('/category/Skin Care')}} style={{ backgroundImage: `url($(#))`}}>Skin Care</div>
                <div onClick={()=>{navigate('/category/Home Appliences')}} style={{ backgroundImage: `url($(#))`}}>Home Appliences</div>
                <div onClick={()=>{navigate('/category/Furnitures')}} style={{ backgroundImage: `url($(#))`}}>Furnitures</div>
                <div onClick={()=>{navigate('/category/Toys')}} style={{ backgroundImage: `url($(#))`}}>Toys</div>
                <div onClick={()=>{navigate('/category/Utensils')}} style={{ backgroundImage: `url($(#))`}}>Utensils</div>
                <div onClick={()=>{navigate('/category/Others')}} style={{ backgroundImage: `url($(#))`}}>Others</div>
            </div>
        </div>
    </div>
  )
}
