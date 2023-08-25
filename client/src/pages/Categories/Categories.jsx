import React, { useEffect } from 'react'
import styles from './Categories.module.css';
import { useNavigate } from 'react-router-dom';
export default function Categories() {
  const navigate = useNavigate();
  useEffect(()=>{window.scrollTo(0, 0);},[]);
  return (
    <div className={styles.categories_container}>
        <div className={styles.categories_main_div}>
            <h2 className={styles.heading}>Categories</h2>
            <br/>
            <hr/>
            <br/>
            <div className={styles.categories}>
                <div onClick={()=>{navigate('/category/Mobile')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=14OQtmA1gpmFZyCFWjb3d9HPFHEh0zsz7')`, backgroundSize: `cover`}}>Mobile</div>
                <div onClick={()=>{navigate('/category/Smart Gadgets')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1K26kCJZdcdU8WGgwAqzz0gJss7NNmR4y')`, backgroundSize: 'cover'}}>Smart Gadgets</div>
                <div onClick={()=>{navigate('/category/Laptops')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1uMIqZuJuKSfKEvCh5jd8Xtm9QqHpNlT7')`, backgroundSize: 'cover'}}>Laptops</div>
                <div onClick={()=>{navigate('/category/Clothes')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=11JI12gBd01HGQe_OfzEbVJvMFQ_ttffX')`, backgroundSize: 'cover' }}>Clothes</div>
                <div onClick={()=>{navigate('/category/Deodorants')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1wYBLu8Ubilxx_znqNisb1YpXgUNk84OK')`,backgroundSize: 'cover'}}>Deodorants</div>
                <div onClick={()=>{navigate('/category/Footwear')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1BlXlrGTuBvo5TBB0-8ARmFdxvNT4P4bH')`,backgroundSize: 'cover'}}>Footwear</div>
                <div onClick={()=>{navigate('/category/Accessories')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1lumnbW87B_8pvr-iOxeNRVkX0Ob5VK8i')`,backgroundSize: 'cover'}}>Accessories</div>
                <div onClick={()=>{navigate('/category/Skin Care')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1kozfLeSgLTu2YOFr-qcdU1YPBcdJfHqg')`,backgroundSize: 'cover'}}>Skin Care</div>
                <div onClick={()=>{navigate('/category/Home Appliences')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1fMQoH5sVRHhMLyk4_CxksrCuINR4IVeO')`,backgroundSize: 'cover'}}>Home Appliences</div>
                <div onClick={()=>{navigate('/category/Furnitures')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1YusZBa7VKYuq_9RUpttlWjfiFFdgNvwY')`,backgroundSize: 'cover'}}>Furnitures</div>
                <div onClick={()=>{navigate('/category/Toys')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1LNT3WrKnhb1NO3v0cyt62G5tbNNEHgUR')`,backgroundSize: 'cover'}}>Toys</div>
                <div onClick={()=>{navigate('/category/Utensils')}} style={{ backgroundImage: `url('https://drive.google.com/uc?export=download&id=1tfMWU89mtbl-zLTPFnBjVXV9ruX8z6Nx')`,backgroundSize: 'cover'}}>Utensils</div>
                <div onClick={()=>{navigate('/category/Others')}} style={{ backgroundImage: `url($(#))`}} className={styles.others}>Others</div>
            </div>
        </div>
    </div>
  )
}
