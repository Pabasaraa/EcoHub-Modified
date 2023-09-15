import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import styles from "./styles/list.articles.module.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const retrieveArticles = async () => {
    axios.get(`http://localhost:8000/articles/get/all`).then((res) => {
      console.log(res.data.data);
      if (res.data.data) {
        setArticles(res.data.data);
      }
    });
  };

  useEffect(() => {
    retrieveArticles();
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/articles/delete/${id}`).then(() => {
      alert("Delete Successfully");
      retrieveArticles();
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchArticles = () => {
    setArticles([]);
    axios
      .post("http://localhost:8000/articles/search", {
        searchTerm: searchTerm,
      })
      .then((res) => {
        setArticles(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <h1
          className="text-center mt-5 mb-3"
          style={{ color: "black", textShadow: "0 0 5px white" }}
        >
          Articles
        </h1>
        <br></br>
        <hr></hr>
        <br></br>
        <InputGroup className={styles.searchBar}>
          <FormControl
            className={styles.searchInput}
            placeholder="Search Articles"
            aria-label="Search Articles"
            aria-describedby="basic-addon2"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="outline-secondary"
            className={styles.searchBtn}
            onClick={searchArticles}
          >
            Search
          </Button>
        </InputGroup>

        <br />
        <br />

        <div className="row">
          {articles &&
            articles.map((articles, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className={styles.card}>
                  <div className="card-body">
                    <h2
                      className="card-title"
                      style={{
                        color: "white",
                        textShadow:
                          "1px 1px 2px black, 0 0 25px black, 0 0 5px darkblue",
                      }}
                    >
                      {articles.articleTitle}
                    </h2>
                    <br></br>
                    <br></br>
                    <h4 className="card-text" style={{ color: "#515c70" }}>
                      Author: {articles.articleAuthor}
                    </h4>
                    <h4 className="card-text">
                      {articles.articleDescription.length > 200
                        ? articles.articleDescription.slice(0, 200) + "..."
                        : articles.articleDescription}
                    </h4>
                    <br></br>
                    <p className="card-text">
                      {articles.articleContent.length > 500
                        ? articles.articleContent.slice(0, 500) + "..."
                        : articles.articleContent}
                    </p>
                    <br></br>
                    <h4 className="card-text">
                      Publication: {articles.dateOfPublication}
                    </h4>
                    <br></br>
                    <div className="d-flex justify-content-between">
                      <a
                        className="btn btn-warning"
                        href={`/updateArticle/${articles._id}`}
                      >
                        <i className="fas fa-edit"></i>&nbsp; Edit
                      </a>
                      <a
                        className="btn btn-danger"
                        onClick={() => onDelete(articles._id)}
                      >
                        <i className="far fa-trash-alt"></i>&nbsp; Delete
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ArticleList;
