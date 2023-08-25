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
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetail, logout } from "../../features/user/userSlice";
import { selectUserCart, selectCartStatus, selectCartError, resetCart } from "../../features/userCart/userCartSlice";
import axios from 'axios';

export default function Navbar() {
  const dispatch = useDispatch();
  const [sideMenu, setSideMenu] = useState(false);
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const user = useSelector( selectUserDetail ) || undefined;
  const cart = useSelector( selectUserCart ) || undefined;
  const cartStatus = useSelector( selectCartStatus ) || undefined;
  const cartError = useSelector( selectCartError ) || undefined;
  const userprofileimage = undefined;

  async function logoutfun() {
    const refreshToken = localStorage.getItem('userRefreshToken');
    try{
      const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/user/logout',
      {
        withCredentials: true,
        headers: { 'Authorization': 'Bearer ' + refreshToken }
      })
      if(response.status === 200) {
        localStorage.removeItem('userRefreshToken');
        localStorage.removeItem('userToken');
        dispatch(logout());
        dispatch(resetCart());
        navigate('/login');
        }
    } catch(err) {
      console.log(err.message)
    }
  }

  useEffect(()=>{
    if(user?.id && cart.status === 'idle') dispatch(fetchCart());
  },[]);

  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <div className={styles.left_side}>
          <img src={logo} alt='logo image' className={styles.logo_image} onClick={()=>{navigate('/home')}}/>
          <Link to='/home'>SuperMART</Link>
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
            <Link to='/home'>Home</Link>
            <Link to='/products'>Store</Link>
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
                      <span onClick={()=>{navigate('/orders')}}>Orders</span>
                      <span onClick={()=>{navigate('/favourite')}}>Favorites</span>
                      <span onClick={()=>{navigate('/user-profile')}}>My Account</span>
                      <span>Help</span>
                      <span onClick={logoutfun}>Logout</span>
                    </div>
                  </div>
                </div>
                <div className={styles.cart_box} onClick={()=>{ setShowCart(prev => !prev)}}>
                  <img className={styles.cart_icon} src={cartimage} />
                    { cart?.length > 0 && <div className={styles.cart_counter}> {cart.length} </div> }
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
            <Link to='/home' onClick={() => setSideMenu(false)}>Home</Link>
            <Link to='/categories' onClick={() => setSideMenu(false)}>Categories</Link>
            <Link to='/products'  onClick={() => setSideMenu(false)}>Store</Link>
            <Link to='/search' onClick={() => setSideMenu(false)}>Search</Link>
            <Link to='/about' onClick={() => setSideMenu(false)}>About</Link>
            {user?.name && <Link to='/user-profile' onClick={() => setSideMenu(false)}>Profile</Link>}
            {user?.name && <Link to='/orders' onClick={() => setSideMenu(false)}>Order</Link> }
            {user?.name && <Link to='/favourite' onClick={() => setSideMenu(false)}>Favourite</Link> }
            {user?.name && <Link onClick={() => { setShowCart(prev => !prev); setSideMenu(false)}}>Cart</Link>}
            {user?.name ? <span  className={styles.logoutspan} onClick={() => { setSideMenu(false); logoutfun() }}>Logout</span> : <Link to='/login' onClick={() => setSideMenu(false)}>Login</Link>}
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
                  <div key={item.product.id}>
                    <CartProduct item={item} />
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.cart_bottom}>
            <hr />
            <div className={styles.total_cart_price}><span>Total price:</span><span>&#8377; {cart.reduce((totalSum, item) => totalSum + Number(item.product.price*item.quantity), 0)}</span></div>
            <div className={styles.checkout_btn}>
              <Button value="Checkout" action={()=>{setShowCart(false); navigate('/checkout')}} />
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  );
}