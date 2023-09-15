import React from "react";
import styles from "./styles/services.module.css";
import Heading from "../../components/common/heading";
import { homeAbout } from "./dummyData/dummyData.js";
import services_img1 from "../../assets/sv_img1.jpg";

const HomeServices = () => {
  return (
    <div>
      <section className={styles.aboutHome}>
        <Heading
          subtitle="Fostering the Growth of Solar Energy Market"
          title="A Leading Supplier Of Solar Materials For Manufacturers, And Contractors."
        />
        <div className={styles.container}>
          <div className={styles.left_row}>
            <img src={services_img1} alt="" />
          </div>

          <div className={styles.items}>
            {homeAbout.map((val) => {
              return (
                <div className={styles.item_flexSB}>
                  <div className={styles.imgContainer}>
                    <img className={styles.img} src={val.cover} alt="" />
                  </div>
                  <div className={styles.text}>
                    <h2>{val.title}</h2>
                    <p>{val.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {/* <Awrapper /> */}
    </div>
  );
};

export default HomeServices;
