import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import Banner from "../../components/Banner/Banner";
import Banner1 from "./components/Banner1";
import Video1 from "./components/Video1";
import Video2 from "./components/Video2";
import Banner2 from "./components/Banner2";
import Banner3 from "./components/Banner3";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../features/userCart/userCartSlice";
import { selectUserDetail } from "../../features/user/userSlice";
export default function HomePage() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetail);

  useEffect(() => {
    window.scrollTo(0, 0);
    if(user?.name) dispatch(fetchCart());
  },[]);

  return (
    <div className={styles.homepage_container}>
      <Banner />
      <Video1 />
      <Banner1 />
      <Banner2 />
      <Video2 />
      <Banner3 />
    </div>
  );
}
