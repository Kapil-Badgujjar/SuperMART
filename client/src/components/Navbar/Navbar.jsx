import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '/logo.png';
import menu from '/menu.png';
import close from '/close.png';
import cartimage from '/icons/cart.png';
import userprofile from '/icons/user.png';
import Button from '../Button/Button';
import CartProduct from '../CartProducts/CartProduct';

import { useSelector } from "react-redux";
import { selectUserDetail, logout } from "../../features/user/userSlice";
import { selectUserCart, selectCartStatus, selectCartError } from "../../features/userCart/userCartSlice";
import axios from 'axios';

export default function Navbar() {
  const [sideMenu, setSideMenu] = useState(false);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const user = useSelector( selectUserDetail ) || undefined;
  const cart = useSelector( selectUserCart ) || undefined;
  const cartStatus = useSelector( selectCartStatus ) || undefined;
  const cartError = useSelector( selectCartError ) || undefined;
  const userprofileimage = undefined;

  useEffect(() => {
    console.log(cart);
  },[cart]);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log(token);
    async function getDetails() {
      const response =await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/user/check-passportjwt',{}, {withCredentials: true, 
        headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + token },
      })
      console.log(response);
    }
    getDetails();
  },[]);

  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.left_side}>
          <img src={logo} alt='logo image' className={styles.logo_image} onClick={()=>{navigate('/')}}/>
          <Link to='/'>SuperMART</Link>
        </div>
        <div className={styles.menu_button_container}>
          <img
            src={sideMenu ? close : menu}
            alt='menu button'
            className={styles.menu_button}
            onClick={() => setSideMenu((prev) => !prev)}
          />
        </div>
          <div className={styles.center}>
            <Link to='/'>Home</Link>
            <Link to='/products'>Products</Link>
            <Link to='/categories'>Categories</Link>
            <Link to='/search'>Search</Link>
            <Link to='/about'>About</Link>
          </div>
          {!user?.name ? <Link to='/login'>Login</Link> :
            <div className={styles.right_side}>
              <div className={styles.user_profile}>
                <Link to='/user-profile'><img className={styles.profile_image} src={userprofileimage ? userprofileimage : userprofile} alt='Profile Image' /></Link>
                  <div className={styles.user_float_menu}>
                    <div className={styles.top_space}></div>
                    <div className={styles.user_menu_options}>
                      <div><span className=''></span></div>
                      {user && <span>{user.name}</span> }
                      <span>Orders</span>
                      <span>Favorites</span>
                      <span>My Account</span>
                      <span>Help</span>
                      <span>Logout</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cart_box} onClick={()=>{ setShowCart(prev => !prev)}}>
                  <img className={styles.cart_icon} src={cartimage} />
                    { cart && <div className={styles.cart_counter}> {cart.length } </div> }
                </div>
            </div>
          }
      </div>
      {window.innerWidth < 768 && ( // Render the side menu on smaller screens
        <div className={styles.side_menu} style={{ '--side-menu-right': sideMenu ? '0' : '-100%' }}>
          <div
            className={styles.left_side}
            onClick={() => setSideMenu(false)}
          ></div>
          <div className={styles.right_side}>
            <Link to='/'>Home</Link>
            <Link to='/categories'>Categories</Link>
            <Link to='/products'>products</Link>
            <Link to='/search'>Search</Link>
            <Link to='/about'>About</Link>
            {user?.name && <Link to='/user-profile'>Profile</Link>}
            {user?.name && <Link to='/orders'>Order</Link> }
            {user?.name && <Link to='/favorite'>Favorite</Link> }
            {user?.name && <Link onClick={()=>{ setShowCart(prev => !prev)}}>Cart</Link>}
            {user?.name ? <Link to='/logout'>Logout</Link> : <Link to='/login'>Login</Link>}
          </div>
        </div>
      )}
      {showCart && <div className={styles.user_cart_page} >
        <div className={styles.cart_left_side} onClick={()=>{ setShowCart(false)}}>
        </div>
        <div className={`${styles.user_cart} ${showCart ? styles.show_user_cart:''}`}>
          <div>
            <div className={styles.cart_top}>
              <span>CART</span>
              <span onClick={()=>{ setShowCart(false)}}>&times;&nbsp;</span>
            </div>
            <hr />
            <div className={styles.cart_products_block}>
              {/* Rendering cart products */}
              { cart.map((item)=>{
                return(
                  <CartProduct product={item} />
                )
              })}
            </div>
          </div>
          <div className={styles.cart_bottom}>
            <hr />
            <div className={styles.total_cart_price}><span>Total price:</span><span>&#8377; {cart.reduce((totalSum, item) => totalSum + Number(item.price), 0)}</span></div>
            <div className={styles.checkout_btn}>
              <Button value="Checkout" action={()=>{}} />
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}
