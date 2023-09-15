import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./styles/add.product.module.css";

const UpdateProduct = () => {
  const [productData, setProductData] = useState({});
  const [images, setImages] = useState([]);

  const navigate = useNavigate("");
  const params = useParams();

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get(
        `http://localhost:8000/products/${params.id}`
      );
      setProductData(res.data.data);
    };
    getdata();
  }, []);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handleCategoryChange = (e) => {
    setProductData((prevData) => ({
      ...prevData,
      productCategory: e.target.value,
    }));
  };

  const updateItem = async (e) => {
    e.preventDefault();

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

    await axios
      .put(`http://localhost:8000/products/update/${params.id}`, formData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        alert("Item Updated Successfully");
        navigate("/admin/dashboard/products");
      })
      .catch((err) => {
        console.log(err);
        alert("Item Update Failed. Check console for more details");
      });
  };

  return (
    <section className="container py-5 h-100">
      <div className="row d-flex h-100">
        <div className="card-body text-center">
          <form onSubmit={updateItem}>
            <h2 className="mb-4">Update Product</h2>
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
                <option
                  value="solar-panels"
                  selected={productData.productCategory === "solar-panels"}
                >
                  Solar Panels
                </option>
                <option
                  value="inverters"
                  selected={productData.productCategory === "inverters"}
                >
                  Inverters
                </option>
                <option
                  value="home-appliances"
                  selected={productData.productCategory === "home-appliances"}
                >
                  Home Appliances
                </option>
                <option
                  value="other"
                  selected={productData.productCategory === "other"}
                >
                  Other
                </option>
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
              Update
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
