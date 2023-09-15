import React from "react";
import { footer } from "./dummyData/dummyData.js";
import styles from "./styles/footer.module.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className={styles.container}>
          <div className={styles.box}>
            <div className={styles.logo}>
              <h2>Do You Need Help With Anything?</h2>
              <p>
                Receive updates, hot deals, tutorials, discounts sent straignt
                in your inbox every month
              </p>

              <div className={styles.input_flex}>
                <input type="text" placeholder="Email Address" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className={styles.box}>
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items) => (
                  <li> {items.list} </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className={styles.legal}>
        <span>© 2023 DS Project. Designd By Team 39.</span>
      </div>
    </>
  );
};

export default Footer;
