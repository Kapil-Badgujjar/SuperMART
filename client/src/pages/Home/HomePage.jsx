import React from "react";
import styles from "./HomePage.module.css";
import Banner from "../../components/Banner/Banner";
import Banner1 from "./components/Banner1";
import Video1 from "./components/Video1";
import Video2 from "./components/Video2";
import Banner2 from "./components/Banner2";
import Banner3 from "./components/Banner3";
import Video3 from "./components/Video3";
export default function HomePage() {
  return (
    <div className={styles.homepage_container}>
      <Banner />
      <Video1 />
      <Banner1 />
      <Banner2 />
      <Video2 />
      <Banner3 />
      {/* <Video3 /> */}
    </div>
  );
}
