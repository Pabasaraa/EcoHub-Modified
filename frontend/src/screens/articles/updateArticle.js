import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateArticles = () => {
  const [articleData, setArticleData] = useState({});

  const navigate = useNavigate("");
  const params = useParams();

  const getArticlesById = async () => {
    const res = await axios.get(`http://localhost:8000/articles/${params.id}`);

    setArticleData(res.data.data);
  };

  useEffect(() => {
    getArticlesById();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticleData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const updateArticle = async (e) => {
    e.preventDefault();

    console.log(articleData);

    const formData = new FormData();
    // formData.append("token", localStorage.getArticle("token"));
    formData.append("role", articleData.role);
    formData.append("adminId", articleData.adminId);
    formData.append("articleTitle", articleData.articleTitle);
    formData.append("articleAuthor", articleData.articleAuthor);
    formData.append("articleDescription", articleData.articleDescription);
    formData.append("articleContent", articleData.articleContent);
    formData.append("dateOfPublication", articleData.dateOfPublication);

    await axios
      .put(`http://localhost:8000/articles/update/${params.id}`, formData)
      .then((res) => {
        console.log(res);
        alert("article Updated Successfully");
        navigate("/articleList");
      })
      .catch((err) => {
        console.log(err);
        alert("article Update Failed. Check console for more details");
      });
  };

  return (
    <div
      className="container"
      style={{ background: "#f8f9fa", padding: "20px" }}
    >
      <h2 className="h-tag" style={{ color: "#333", marginBottom: "20px" }}>
        <i class="fa-solid fa-pen-to-square"></i> Edit Article
      </h2>
      <div className="input-form">
        <form className="forms" noValidate>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>Role:</label>
            <br />
            <input
              type="text"
              className="form-control"
              name="role"
              placeholder="admin"
              defaultValue={articleData.role}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Admin ID:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="adminId"
              placeholder="Enter Admin ID"
              defaultValue={articleData.adminId}
              onChange={handleInputChange}
              disabled
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Article Title:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="articleTitle"
              placeholder="Enter the Title"
              defaultValue={articleData.articleTitle}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Article Author:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="articleAuthor"
              placeholder="Enter the Title"
              defaultValue={articleData.articleAuthor}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Article Description:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="articleDescription"
              placeholder="Enter Article Description"
              defaultValue={articleData.articleDescription}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Article Content:
            </label>
            <br />
            <input
              type="text"
              className="form-control"
              name="articleContent"
              placeholder="Enter article Content"
              defaultValue={articleData.articleContent}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={{ marginBottom: "5px", color: "#555" }}>
              Date Of Publication:
            </label>
            <br />
            <input
              type="date"
              className="form-control"
              name="dateOfPublication"
              placeholder="Enter the Date"
              defaultValue={articleData.dateOfPublication}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="btn btn-success"
            type="submit"
            style={{ marginTop: "15px" }}
            onClick={updateArticle}
          >
            <i className="far fa-check-square"></i>&nbsp;Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticles;
