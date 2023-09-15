import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles/add.product.module.css";

const AddProducts = () => {
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);

  const navigate = useNavigate();

  const validateUser = async () => {
    console.log("validating user");
  };

  useEffect(() => {
    validateUser();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleCategoryChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      productCategory: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(productData);

    const formData = new FormData();
    formData.append("token", localStorage.getItem("token"));
    formData.append("productName", productData.productName);
    formData.append("productDescription", productData.productDescription);
    formData.append("productCategory", productData.productCategory);
    formData.append("productPrice", productData.productPrice);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    axios
      .post("http://localhost:8000/products/new", formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/products");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <section className="container py-5 h-100">
      <div className="row d-flex h-100">
        <div className="card-body text-center">
          <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Add New Product</h2>
            <hr className="mb-4" style={{ opacity: "0.15" }} />

            <div className="form-group mb-4">
              <label
                htmlFor="productCategory"
                className="mb-2 text-muted"
                style={{ float: "left" }}
              >
                Product Category:
              </label>
              <select
                id="productCategory"
                className="form-select"
                placeholder="Select Category"
                name="productCategory"
                value={productData.productCategory}
                onChange={handleCategoryChange}
                required
              >
                <option value="">Select Category</option>
                <option value="solar-panels">Solar Panels</option>
                <option value="inverters">Inverters</option>
                <option value="home-appliances">Home Appliances</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="productName"
                className="mb-2 text-muted"
                style={{ float: "left" }}
              >
                Product Name:
              </label>
              <input
                type="text"
                id="productName"
                className="form-control"
                name="productName"
                defaultValue={productData.productName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="productDescription"
                className="mb-2 text-muted"
                style={{ float: "left" }}
              >
                Product Description:
              </label>
              <textarea
                id="productDescription"
                className="form-control"
                name="productDescription"
                defaultValue={productData.productDescription}
                onChange={handleInputChange}
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="productPrice"
                className="mb-2 text-muted"
                style={{ float: "left" }}
              >
                Product Price:
              </label>
              <input
                type="text"
                id="productPrice"
                className="form-control"
                name="productPrice"
                defaultValue={productData.productPrice}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group mb-5">
              <label
                htmlFor="productImages"
                className="mb-2 text-muted"
                style={{ float: "left" }}
              >
                Product Images:
              </label>
              <input
                type="file"
                id="productImages"
                className="form-control"
                name="productImages"
                onChange={handleImageChange}
                required
              />
            </div>

            <hr className="mt-4 mb-3" style={{ opacity: "0.15" }} />

            <button className={styles.btn} type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddProducts;
