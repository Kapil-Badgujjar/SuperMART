import React, {useEffect} from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import styles from './Root.module.css'
import { login } from '../../features/user/userSlice'
import { fetchCart } from '../../features/userCart/userCartSlice'
import { useDispatch } from 'react-redux'
export default function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const refreshToken = localStorage.getItem('userRefreshToken');
    async function getDetails() {
      try{
        const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/user/get-user-details', {withCredentials: true, 
          headers: { "Authorization": 'Bearer ' + token },
        })
        dispatch(login(response.data));
        dispatch(fetchCart());
        navigate('/home');
      } catch (error) {
        console.log(error.message);
        try{
          const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/user/refresh-token', {
            withCredentials: true,
            headers: {
              "Authorization": "Bearer " + refreshToken
            }
          });
          localStorage.setItem('userToken', response.data.newAccessToken);
          dispatch(fetchCart());
          navigate('/home');
        }
        catch (err) {
          console.log(err.message);
          navigate('/login');
         }
      }
    }
    getDetails();
  },[]);

  return (
    <div>
      <div><Navbar /></div>
      <div className={styles.navbar_space}></div>
      <div><Outlet /></div>
      <div><Footer /></div>
    </div>
  )
}
