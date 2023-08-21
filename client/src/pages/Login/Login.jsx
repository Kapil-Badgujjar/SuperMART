import React, { useRef, useEffect } from "react";
import styles from "./Login.module.css";
import Button from "../../components/Button/Button";
import sb from "/bk.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../features/user/userSlice";
import { selectUserDetail, selectUserStatus, selectUserErrors } from "../../features/user/userSlice";
import { fetchCart } from "../../features/userCart/userCartSlice";

export default function Login() {
  let formRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserDetail) || undefined;
  const status = useSelector(selectUserStatus) || undefined;
  let errors = useSelector(selectUserErrors) || undefined;

 useEffect(() => {
    { user.name && navigate("/home"); }
  },[user]);

  async function userLogin(event) {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    console.log(formData.get('email'));
    try {
      if(status !== 'loading') {
        dispatch(fetchUser(formData));
      } else {
        setTimeout(() => userLogin(event), 3000);
      }
    } catch (err) {
      errors = err.message;
    }
  }

  return (
    <div style={{ background: `url(${sb})` }} className={styles.form_container}>
      <form ref={formRef} className={styles.login_form}>
        <h1>SuperMART</h1>
        <br />
        <h2>Login to your account</h2>
        <p className={styles.error}>{errors ? errors:''}</p>
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
