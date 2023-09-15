import React from "react";
import { team } from "./dummyData/dummyData.js";
import styles from "./styles/aboutUs.module.css";
import Heading from '../../components/common/heading';

const AboutUs = () => {
  return (
    <>
      <section className={styles.team_background}>
        <div className={styles.container}>
      
    
            <Heading subtitle='Fostering the Growth of Solar Energy Market' title='What they say about us' />
         
          <div className={styles.grid4}>
            {team.map((val, index) => (
              <div className={styles.box} key={index}>
                <div className={styles.details}>
                  <div className={styles.img}>
                    <img src={val.cover} alt="" />
                  </div>
                  <di className={styles.container1}>
                    <h4>{val.name}</h4>
                    <p>{val.discription}</p>
                  </di>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
