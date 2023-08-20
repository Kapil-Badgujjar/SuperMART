import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { login, selectSeller } from '../../features/seller/sellerSlice'
import axios from 'axios'
export default function SellerPage() {
    const seller = useSelector(selectSeller);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('sellerToken');
        const refreshToken = localStorage.getItem('sellerRefreshToken');
        async function getSellerDetails() {
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/sellers/get-seller-details', {
                    withCredentials: true,
                    headers: {
                        "Authorization": "Bearer " + accessToken
                    }
                })
                if(response.status === 200){
                    console.log(response.data)
                    dispatch(login(response.data))
                    navigate('/sellers/seller-account/dashboard');
                }
            } catch(error) {
                console.log(error.message);
                try {
                    const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/sellers/refresh-token', {
                        withCredentials: true,
                        headers: {
                            "Authorization": "Bearer " + refreshToken
                        }
                    })
                    if(response.status === 200){
                        localStorage.setItem('sellerToken', response.data.newAccessToken)
                        // console.log(response.data)
                        dispatch(login(response.data.seller))
                        navigate('/sellers/seller-account/dashboard');
                    }
                } catch(err) {
                    console.log(err.message);
                    navigate('/sellers/login')
                }
            }
        }
        getSellerDetails();
    },[]);
  return (
    <Outlet />
  )
}
