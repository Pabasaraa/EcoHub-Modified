import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Seminarlist } from "./dummyData/dummyData.js";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { BsFillClockFill } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import styles from "./styles/listCard.seminar.module.css";
import axios from "axios";

const ListCard = () => {
  const [seminars, setSeminars] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/seminars/get/all")
      .then((res) => {
        setSeminars(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <>
      {seminars &&
        seminars.map((seminar, key) => (
          <div className="items shadow">
            <div className={styles.text}>
              <div className={styles.Box}>
                <span className={styles.Box1}>
                  <i className={styles.flexSB}>
                    <BsFillCalendar2DateFill />
                  </i>
                  <label htmlFor="">{seminar.seminarDate}</label>
                </span>
                <span className={styles.Box2}>
                  <i className={styles.flexSB}>
                    <BsFillClockFill />
                  </i>
                  <label htmlFor="">{seminar.seminarTime}</label>
                </span>
                <span className={styles.Box3}>
                  <i className={styles.flexSB}>
                    <ImLocation2 />
                  </i>
                  <label htmlFor="">{seminar.seminarLocation}</label>
                </span>
              </div>
              <h>{seminar.seminarLocationDis}</h>
              <p>{seminar.seminarDescription}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ListCard;
