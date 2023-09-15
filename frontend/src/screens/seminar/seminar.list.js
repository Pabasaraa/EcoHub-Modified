import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/list.seminar.module.css";
import ImgHead from "./img.head";
import ListCard from "./seminar.listCard";
import img from "../../assets/headimglist.png";
import axios from "axios";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";

const SeminarList = () => {
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
          name="Conducted by ECOHUB"
          title="Seminar Sessions"
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
            placeholder="Search Location"
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
              <ListCard />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default SeminarList;
