import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormControl, InputGroup, Badge } from "react-bootstrap";
import { MDBCard, MDBCardBody, MDBCardImage } from "mdb-react-ui-kit";
import axios from "axios";

import styles from "./styles/all.products.module.css";

import Loader from "../../components/common/spinner";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState(null);
  const [imageBuffers, setImageBuffers] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const navigate = useNavigate();

  const categories = [
    "All Categories", // Include an option for showing all categories
    "Solar Panels",
    "Inverters",
    "Home Appliances",
    "Other",
  ];

  useEffect(() => {
    axios
      .get("http://localhost:8000/products/get/all")
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  useEffect(() => {
    if (products) {
      const buffers = products.map((product) => product.productImages[0].data);
      setImageBuffers(buffers);
    }
  }, [products]);

  useEffect(() => {
    const strings = imageBuffers.map((buffer) => {
      const binary = Array.from(new Uint8Array(buffer))
        .map((b) => String.fromCharCode(b))
        .join("");
      return `data:image/jpeg;base64,${btoa(binary)}`;
    });
    setBase64Strings(strings);
  }, [imageBuffers]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProducts = () => {
    axios
      .post("http://localhost:8000/products/search", {
        searchTerm: searchTerm,
      })
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div data-testid="all-products">
      <div className={styles.container} style={{ padding: "0 60px" }}>
        <InputGroup className={styles.searchBar}>
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
        </InputGroup>
        <div className="d-flex justify-content-between">
          <h5>All Products:</h5>
          <div>
            <label htmlFor="category-select" style={{ marginRight: "15px" }}>
              Filter by Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{
                width: "150px",
                height: "30px",
                borderRadius: "5px",
                borderColor: "#ced4da",
                color: "#495057",
              }}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        {products && base64Strings.length > 0 ? (
          <div className={styles.productGrid}>
            {products.map((product, key) => (
              <MDBCard
                key={product.id}
                onClick={() => navigate(`/products/${product._id}`)}
                style={{ cursor: "pointer" }}
                className={styles.productCard}
                data-testid={`product-card-${key + 1}`}
              >
                <MDBCardImage
                  src={base64Strings[key]}
                  position="top"
                  alt={product.productName}
                  className={styles.productIms}
                />
                <MDBCardBody
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <hr className="mb-4" style={{ opacity: "0.15" }} />
                    <div className="d-flex justify-content-between mb-1">
                      <h5 className="mb-0">{product.productName}</h5>
                    </div>

                    <div className="d-flex justify-content-between mb-3">
                      <p className="small text-muted mb-0">
                        {product.productCategory}
                      </p>
                    </div>
                  </div>

                  <div class="d-flex justify-content-between mb-3 mt-1">
                    <div style={{ marginTop: "7px" }}>
                      <Badge class="text-muted mb-0" bg="success">
                        Available
                      </Badge>
                    </div>
                    <h3 className="text-dark mb-0">
                      {product.productPrice}{" "}
                      <span style={{ fontSize: "0.9rem" }}>LKR</span>
                    </h3>
                  </div>
                </MDBCardBody>
              </MDBCard>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default AllProducts;
