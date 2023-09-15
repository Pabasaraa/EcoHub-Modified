// import React from 'react'
// import styles from "./styles/list.seminar.module.css";
// import ImgHead from './img.head';
// import ManageCard  from './seminar.manageCard';
// import img from "../../assets/headimg1.jpg"

// const SeminarManage= () => {
//   return (
//     <div>
//     <section className= {styles.contact}>
//     <ImgHead name='Conducted by us' title='Seminar Sessions' cover={img} />
//     <div className={styles.container}>
//     <section className= {styles.blog_padding}>
//         <div className= {styles.container_grid2}>
//          <ManageCard />

//         </div>

//      </section>
//     </div>
//   </section>
// </div>

//   )
// }

// export default SeminarManage

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/list.seminar.module.css";
import ImgHead from "./img.head";
import ListCard from "./seminar.listCard";
import img from "../../assets/headimgmanage.png";
import axios from "axios";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import ManageCard from "./seminar.manageCard";

const SeminarManage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [seminars, setSeminars] = useState(null);
  // const [imageBuffers, setImageBuffers] = useState([]);
  // const [base64Strings, setBase64Strings] = useState([]);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProducts = () => {
    axios
      .post("http://localhost:8000/seminar/search", {
        searchTerm: searchTerm,
      })
      .then((res) => {
        setSeminars(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <section className={styles.contact}>
        <ImgHead
          name="Managed by ECOHUB"
          style={{ color: "#585555" }}
          title="  Seminar Sessions"
          cover={img}
        />
        {/* <InputGroup className={styles.searchBar}>
          <FormControl
            className={styles.searchInput}
            placeholder="Search products"
            aria-label="Search products"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="outline-secondary"
            className={styles.searchBtn}
            onClick={searchProducts}
          >
            Search
          </Button>
        </InputGroup> */}

        <form className={styles.form}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearchChange}
          />

          <input
            type="submit"
            className={styles.searchBtn}
            value="serch"
            onClick={searchProducts}
          />
        </form>

        <div className={styles.container}>
          <section className={styles.blog_padding}>
            <div className={styles.container_grid2}>
              <ManageCard />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default SeminarManage;
