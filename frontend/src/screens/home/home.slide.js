import React from "react";
// Assets
import slider_img1 from "../../assets/s_img1.png";
import slider_img2 from "../../assets/s_img2.png";
import slider_img3 from "../../assets/s_img3.png";
import slider_img4 from "../../assets/s_img4.png";
import slider_img5 from "../../assets/s_img5.png";

import styles from "./styles/slide.module.css";

function slide() {
  return (
    // <div className= {styles.slider}>
    // <div className= {styles.slider_1}>
    //     <img src={slider_img1}  alt=""/>
    //         <div className= {styles.text}>
    //             <h1>Herbal Without Side Effects</h1>
    //             <span></span>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ipsam. Doloribus quod ipsum assumenda facere natus suscipit fugiat, nulla pariatur error ullam dolore excepturi nam perspiciatis fugit, quos nisi nobis inventore ab voluptatibus, corrupti non. Nobis minus eum dolores aut?</p>
    //         </div>
    // </div>

    // <div className={styles.slider_2}>
    //     <img src={slider_img1} className="img1" alt='' />
    //         <div className={styles.text}>
    //             <h1>Skin Care with Natural Ingredients</h1>
    //             <span></span>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ipsam. Doloribus quod ipsum assumenda facere natus suscipit fugiat, nulla pariatur error ullam dolore excepturi nam perspiciatis fugit, quos nisi nobis inventore ab voluptatibus, corrupti non. Nobis minus eum dolores aut?</p>
    //         </div>
    // </div>

    // <div className={styles.slider_3}>
    //     <img src={slider_img1} className="img1" alt='' />
    //         <div className={styles.text}>
    //             <h1>Super Convenient Quality fat burner</h1>
    //             <span></span>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ipsam. Doloribus quod ipsum assumenda facere natus suscipit fugiat, nulla pariatur error ullam dolore excepturi nam perspiciatis fugit, quos nisi nobis inventore ab voluptatibus, corrupti non. Nobis minus eum dolores aut?</p>
    //         </div>
    // </div>

    // <div className={styles.slider_4}>
    //     <img src={slider_img1} className="img1" alt='' />
    //         <div className={styles.text}>
    //             <h1>Super Convenient Quality fat burner</h1>
    //             <span></span>
    //             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, ipsam. Doloribus quod ipsum assumenda facere natus suscipit fugiat, nulla pariatur error ullam dolore excepturi nam perspiciatis fugit, quos nisi nobis inventore ab voluptatibus, corrupti non. Nobis minus eum dolores aut?</p>
    //         </div>
    // </div>
    // </div>
    <div>
      <div className={styles.slider}>
        <figure>
          <div className={styles.slide}>
            <img src={slider_img1} alt="" />
          </div>
          <div className={styles.slide}>
            <img src={slider_img2} alt="" />
          </div>
          <div className={styles.slide}>
            <img src={slider_img3} alt="" />
          </div>
          <div className={styles.slide}>
            <img src={slider_img4} alt="" />
          </div>
          <div className={styles.slide}>
            <img src={slider_img5} alt="" />
          </div>
        </figure>
      </div>
    </div>
  );
}

export default slide;
