import React from "react";
import { qulity } from "./dummyData/dummyData.js";
import styles from "./styles/qulity.module.css";
import Heading from '../../components/common/heading';

// {styles.items_padding}

const Qulity = () => {
  return (
    <>
      <section className={styles.qulity_box}>
        <div className={styles.container}>
        <Heading subtitle='They Love Our Services' title=' Over 1,24,000+ Happy User Bieng With Us Still They Love Our Services' />

          <div className={styles.grid4}>
            {qulity.map((val, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.icon}>
                  <span>
                    <img src={val.icon} alt="" />
                  </span>
                </div>
                <h1>{val.num}</h1>
                <p>{val.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Qulity;
