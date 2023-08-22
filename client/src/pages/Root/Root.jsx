import React, {Fragment, useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import styles from './Root.module.css';
import { login } from '../../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { getData } from '../../api/AxiosGetRequest';
export default function Root() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const userAccessToken = localStorage.getItem('userToken');
    const userRefreshToken = localStorage.getItem('userRefreshToken');
    if(!userAccessToken || !userRefreshToken) { navigate('/login'); return;}
    async function getDetails() {
      try{
        let response = undefined;
        response = await getData('/user/get-user-details', userAccessToken);
        if(response?.status === 200){
          dispatch(login(response.data));
          navigate('/home');
        } else {
          response = await getData('/user/refresh-token', userRefreshToken);
          console.log(response);
          if(response?.status === 200){
            localStorage.setItem('userToken', response.data.newAccessToken);
            dispatch(login(response.data.user));
            navigate('/home');
          } else {
            navigate('/login');
            return;
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getDetails();
  },[]);

  return (
    <Fragment>
      <div><Navbar /></div>
      <div className={styles.navbar_space}></div>
      <div><Outlet /></div>
      <div><Footer /></div>
    </Fragment>
  )
}
