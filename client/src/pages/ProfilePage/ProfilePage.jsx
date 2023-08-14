import React, { useEffect, useState } from 'react'
import styles from './ProfilePage.module.css'
import Button from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserDetail } from '../../features/user/userSlice';
export default function ProfilePage() {
    const [passwordUpdateBox, setPasswordUpdateBox] = useState(false);
    const navigate = useNavigate();
    const user = useSelector(selectUserDetail);

    useEffect(()=>{
        if(!user.id) navigate('/login');
    },[]);
  return (
    <div className={styles.about_container}>
        <div className={styles.about}>
            <div className={styles.section_1}>
                <div>
                    <h2 className={styles.username}>{user.name}</h2>
                    <h3 className={styles.emailid}>{user.email}</h3>
                </div>
                {/* <img src="#" alt="profile" /> */}
            </div>
            <div className={styles.section_2}>
                <div>
                    <label>Full Name: </label>
                    <input type="text" name="phone" placeholder='Full Name' />
                </div>
                <div>
                    <label>Phone number: </label>
                    <input type="number" name="phone" placeholder='Phone number' />
                </div>
                <div>
                    <label>Date of birth: </label>
                    <input type="date" name="phone" placeholder='Date of birth' />
                </div>
                <div>
                    <label>Permanent Address: </label>
                    <input type="text" name="phone" placeholder='Address' />
                </div>
                <div className={styles.btn}>
                    <Button value="Submit" onClick={()=>{}} />
                </div>
            </div>
            <div className={styles.section_3}>
                <div onClick={()=>{setPasswordUpdateBox(prev => !prev)}}>Update your password</div>
                {passwordUpdateBox && <div className={styles.password_update_box}>
                    <input type='password' placeholder="New password"/>
                    <input type='text' placeholder="Confirm password"/>
                    <div className={styles.btn}>
                        <Button  value="Update" onClick={()=>{}} />
                    </div>
                    </div>}
            </div>
        </div>
    </div>
  )
}
