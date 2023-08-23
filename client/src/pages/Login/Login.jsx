import React, { useRef, useEffect, useState } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import sb from "/bk.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/user/userSlice";
import { selectUserDetail, selectUserStatus, selectUserErrors } from "../../features/user/userSlice";
import { testEmail, testPassword } from "../../utils/dataValidator";

export default function Login() {
  let formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetail);
  const status = useSelector(selectUserStatus);
  const [error, setError] = useState('');
  let loginError = useSelector(selectUserErrors);
  useEffect(()=>{setError(loginError)},[loginError]);

 useEffect(() => {
    { user.name && navigate("/home"); }
  },[user]);

  async function userLogin(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    if(!testEmail(formData.get('email'))){
        setError('* Please enter valid email address');
        setTimeout(() =>{setError('')},3000);
        return;
    }else if(!testPassword(formData.get('password'))){
        setError('* Enter a strong password [a-zA-Z0-9$!@#...]');
        setTimeout(() =>{setError('')},3000);
        return;
    }
    try {
      if(status !== 'loading') {
        dispatch(fetchUser(formData));
      } else {
        setTimeout(() => userLogin(event), 1000);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() =>{setError('')},3000);
    }
  }

  return (
    <div style={{ background: `url(${sb})` }} className={styles.form_container}>
      <form ref={formRef} className={styles.login_form}>
        <h1>SuperMART</h1>
        <br />
        <h2>Login to your account</h2>
        <p className={styles.error}>{error}</p>
        <input
          className={styles.input_box}
          type="text"
          name="email"
          placeholder="E-mail id:"
        />
        <input
          className={styles.input_box}
          type="password"
          name="password"
          placeholder="Password:"
        />
        <div className={styles.btn}>
          <Button
            value="Submit"
            action={(e) => {
              userLogin(e);
            }}
          />
        </div>

        <Link to="/forgot-password">Forgot Password</Link>
        <Link to="/signup">Create New Account</Link>
        <hr />
        <br />
        <Link to="/sellers/login">Go to Seller Login</Link>
        <Link to="/sellers/register">Register as Seller</Link>
      </form>
    </div>
  );
}
