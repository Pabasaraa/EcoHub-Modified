import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import styles from "./styles/list.products.module.css";

import Loader from "../../../components/common/spinner";

const ListProducts = () => {
  const [items, setItems] = useState([]);
  const [imageBuffers, setImageBuffers] = useState([]);
  const [base64Strings, setBase64Strings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const retrieveItems = () => {
    axios
      .get(`http://localhost:8000/products/get/all`)
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    retrieveItems();
  }, []);

  useEffect(() => {
    if (items) {
      const buffers = items.map((product) => product.productImages[0].data);
      setImageBuffers(buffers);
    }
  }, [items]);

  useEffect(() => {
    const strings = imageBuffers.map((buffer) => {
      const binary = Array.from(new Uint8Array(buffer))
        .map((b) => String.fromCharCode(b))
        .join("");
      return `data:image/jpeg;base64,${btoa(binary)}`;
    });
    setBase64Strings(strings);
  }, [imageBuffers]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/products/delete/${id}`).then(() => {
      alert("Delete Successfully");
      retrieveItems();
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProducts = () => {
    setItems([]);
    axios
      .post("http://localhost:8000/products/search", {
        searchTerm: searchTerm,
      })
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5 mb-3">List of items</h2>

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

        {items.length > 0 && base64Strings ? (
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Actions</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {items &&
                base64Strings &&
                items.map((product, key) => (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src={base64Strings[key]}
                          alt="Product"
                          className={`img-fluid rounded`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <p className="fw-normal mb-1">{product.productName}</p>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">
                        {product.productDescription &&
                        product.productDescription.length > 180
                          ? product.productDescription.slice(0, 180) + "..."
                          : product.productDescription}
                      </p>
                    </td>
                    <td>{product.productPrice}/=</td>
                    <td>
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => navigate(`update/${product._id}`)}
                      >
                        Edit
                      </MDBBtn>
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => onDelete(product._id)}
                      >
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
            </MDBTableBody>
          </MDBTable>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
};

export default ListProducts;
