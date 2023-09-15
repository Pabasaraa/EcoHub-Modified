import React from "react";
import styles from "./styles/items.module.css";
import ItemsCard from "./home.itemsCard";
import Heading from '../../components/common/heading';

const Items = () => {
  return (
    <>
      <section className={styles.items_padding}>
        <div className={styles.container}>
        <Heading subtitle='Choose what you want' title='Latest Product' />
          <ItemsCard />
        </div>
      </section>
    </>
  );
};

export default Items;
