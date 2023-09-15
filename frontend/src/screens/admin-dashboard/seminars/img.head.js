import React from 'react'
import styles from "./styles/img.head.module.css";

const ImgHead = ({ name, title, cover }) => {
  return (
    <div>
       <div className= {styles.back}>
        <div className= {styles.container}>
          <span>{name}</span>
          <h1>{title}</h1>
        </div>
        <img src={cover} alt='' />
      </div>
    </div>
  )
}

export default ImgHead
