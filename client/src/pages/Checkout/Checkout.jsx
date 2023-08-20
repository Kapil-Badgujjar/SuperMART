import React, { useEffect, useRef, useState } from 'react'
import styles from './Checkout.module.css';
import Button from '../../components/Button/Button'
import axios from 'axios';

export default function Checkout() {
    const inputBoxReference = useRef(null);
    const [addressFlag, setAddressFlag] = useState(false);
    const [address, setAddress] = useState('');
    const [defaultAddress, setDefaultAddress] = useState('');

    useEffect(()=>{
        
    },[addressFlag]);

    useEffect(()=>{
        async function getUserAddress(){
            const token = localStorage.getItem('userToken');
            try {
                const response = await axios.get(import.meta.env.VITE_SERVER_ADDRESS + '/user/get-user-address',
                {
                    withCredentials:true,
                    headers: {
                        "Authorization": "Bearer " + token,
                    }
                })
                setDefaultAddress(response.data.address);
            } catch (error) {
                console.log(error.message);
            }
        }
        getUserAddress();
    },[]);

    async function handlePayment(){
        try{
            const token = localStorage.getItem('userToken');
            const response = await axios.post(import.meta.env.VITE_SERVER_ADDRESS + '/user/make-order-session', { address: addressFlag ? defaultAddress:address },{
                withCredentials: true,
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            console.log(response.data);
            if(response.status === 200) window.location.href = response.data.url;
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div>
        <div className={styles.checkoutDiv}>
            <h2>Address</h2>
            <div><input ref={inputBoxReference} type="checkbox" name="defaultAddress" id="defaultAddress" onClick={(e)=>{setAddressFlag(prev => !prev)}} /> <label htmlFor="defaultAddress" onClick={(e)=>{setAddressFlag(prev => !prev)}}>Choose Default Address</label></div>
            <textarea className={styles.addressText} name="address" placeholder='Enter your address' value={inputBoxReference?.current?.checked ? defaultAddress: address} onChange={(e)=>{setAddress(e.target.value)}} disabled={inputBoxReference?.current?.checked}></textarea>
            <Button value="Proceed to payment" action={handlePayment} />
        </div>
    </div>
  )
}
