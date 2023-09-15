import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles/add.article.module.css";
import image from "./styles/img/background1.png";

const AddArticles = () => {
  const [articleData, setArticleData] = useState({});

  const navigate = useNavigate();

  const validateUser = async () => {
    console.log("validating user");
  };

  useEffect(() => {
    validateUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setArticleData({ ...articleData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(articleData);

    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    formData.append("role", articleData.role);
    formData.append("adminId", articleData.adminId);
    formData.append("articleTitle", articleData.articleTitle);
    formData.append("articleAuthor", articleData.articleAuthor);
    formData.append("articleDescription", articleData.articleDescription);
    formData.append("articleContent", articleData.articleContent);
    formData.append("dateOfPublication", articleData.dateOfPublication);

    // Create a JavaScript object from the FormData
    const data = {};
    for (let [key, value] of formData.entries()) {
      data[key] = value;
    }

    axios
      .post("http://localhost:8000/articles/new", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/articleList");
      })
      .catch((error) => {
        console.log(data);
        console.log(error);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        marginTop: "50px",
        alt: " ",
      }}
    >
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
          <div
            div
            className="card shadow-2-strong"
            style={{
              borderRadius: "10px",
              borderColor: "white",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 4px 10px 0px",
              marginTop: "150px",
              marginBottom: "150px",
              marginLeft: "80px",
            }}
          >
            <div className="card-body p-5 text-center">
              <form onSubmit={handleSubmit}>
                <h1
                  className="mb-4"
                  style={{
                    color: "white",
                    textShadow:
                      "1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue",
                  }}
                >
                  {" "}
                  New Article
                </h1>
                <hr className="mb-4" style={{ opacity: "0.15" }} />

                <div className="row">
                  <div className="col">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="role"
                        className="mb-2 text-muted"
                        style={{ float: "left" }}
                      >
                        Role:
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="form-control"
                        defaultValue={articleData.role}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group mb-4">
                      <label
                        htmlFor="adminId"
                        className="mb-2 text-muted"
                        style={{ float: "left" }}
                      >
                        Admin ID:
                      </label>
                      <input
                        type="text"
                        id="adminId"
                        name="adminId"
                        className="form-control"
                        defaultValue={articleData.adminId}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="articleTitle"
                    className="mb-2 text-muted"
                    style={{ float: "left" }}
                  >
                    Article Title:
                  </label>
                  <input
                    type="text"
                    id="articleTitle"
                    name="articleTitle"
                    className="form-control"
                    defaultValue={articleData.articleTitle}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="articleAuthor"
                    className="mb-2 text-muted"
                    style={{ float: "left" }}
                  >
                    Author of the Article:
                  </label>
                  <input
                    type="text"
                    id="articleAuthor"
                    className="form-control"
                    name="articleAuthor"
                    defaultValue={articleData.articleAuthor}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="articleDescription"
                    className="mb-2 text-muted"
                    style={{ float: "left" }}
                  >
                    Article Description:
                  </label>
                  <textarea
                    id="articleDescription"
                    className="form-control"
                    name="articleDescription"
                    defaultValue={articleData.articleDescription}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="articleContent"
                    className="mb-2 text-muted"
                    style={{ float: "left" }}
                  >
                    Article Content:
                  </label>
                  <textarea
                    id="articleContent"
                    className="form-control"
                    name="articleContent"
                    defaultValue={articleData.articleContent}
                    onChange={handleInputChange}
                    rows="4"
                    required
                  ></textarea>
                </div>

                <div className="form-group mb-4">
                  <label
                    htmlFor="dateOfPublication"
                    className="mb-2 text-muted"
                    style={{ float: "left" }}
                  >
                    Date of Publication:
                  </label>
                  <input
                    type="date"
                    id="dateOfPublication"
                    className="form-control"
                    name="dateOfPublication"
                    defaultValue={articleData.dateOfPublication}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <hr className="mt-4 mb-3" style={{ opacity: "0.15" }} />

                <button className={styles.btn} type="submit">
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddArticles;
