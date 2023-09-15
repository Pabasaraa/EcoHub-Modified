import React from "react"
import styles from "./styles/heading.module.css";

const Heading = ({ subtitle, title }) => {
  return (
    <>
      <div className={styles.heading}>
        <h3>{subtitle} </h3>
        <h1>{title} </h1>
      </div>
    </>
  )
}

export default Heading