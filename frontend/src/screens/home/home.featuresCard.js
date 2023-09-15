import React from "react";
import { feature } from "./dummyData/dummyData.js";
import styles from "./styles/feature.module.css";

const FeatureCard = () => {
  return (
    <>
      <div className={styles.Main_box} style={{ marginTop: "60px" }}>
        {feature.map((items, index) => (
          <div className={styles.box} key={index}>
            <img src={items.cover} alt="" />
            <h4>{items.name}</h4>
            <label>{items.total}</label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FeatureCard;
