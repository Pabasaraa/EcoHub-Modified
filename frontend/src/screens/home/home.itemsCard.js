import React from "react";
import { items } from "./dummyData/dummyData.js";
import styles from "./styles/items.module.css";

// {styles.featured_background}

const ItemsCard = () => {
  return (
    <>
      <div className={styles.items_box}>
        {items.map((val, index) => {
          const { cover, offer, discription, name, cart, price } = val;
          return (
            <div className={styles.items_shadow} key={index}>
              <div className={styles.img1}>
                <img src={cover} alt="" />
              </div>
              <div className={styles.text}>
                <div className={styles.offer_flex}>
                  <span
                    style={{
                      background: offer === "50%" ? "#25b5791a" : "#ff98001a",
                      color: offer === "20%" ? "#25b579" : "#ff9800",
                    }}
                  >
                    {offer}
                  </span>
                </div>
                <h4>{name}</h4>
                <p>{discription}</p>
              </div>
              <div className={styles.button}>
                <div>
                  <button className={styles.btn2}>{cart}</button>
                  <span>{price}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ItemsCard;
