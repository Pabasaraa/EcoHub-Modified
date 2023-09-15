import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge } from "react-bootstrap";
import Loader from "../../components/common/spinner";
import styles from "./styles/profile.module.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [csrf, setCsrf] = useState(null); // Locally stored CSRF token
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    ValidateToken(getUser);
  }, []);

  function ValidateToken(callback) {
    document.cookie = "connect.sid= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";

    //send axios request to server to validate token with custom header
    // When the browser has both tokens got from google and our server, It will throw an error
    axios
      .post(
        "http://localhost:8000/users/validatetoken",
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setCsrf(res.data.data.csrf);
        callback(res.data.data._id);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }

  const getUser = async (_id) => {
    const user = await axios.get(`http://localhost:8000/users/${_id}`);
    setUser(user.data);
  };

  const fetchOrders = async () => {
    const allOrders = await axios.get(
      `https://ecohub-backend.onrender.com/orders/user/${user._id}`
    );

    setOrders(allOrders.data.data);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        fetchOrders();
      }, 2000);
    }
  }, [user]);

  const logout = async () => {
    try {
      axios.post(
        "http://localhost:8000/users/logout",
        {},
        { withCredentials: true }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const deleteUser = () => {
    ValidateToken(delUser);
  };

  const delUser = async (id) => {
    axios
      .delete(`http://localhost:8000/users/delete/${id}?csrf=${csrf}`, {
        withCredentials: true,
      })
      .then(() => {
        alert("Account deleted successfully!");
        navigate("/login");
      })
      .catch((err) => {
        alert("Account deletion failed, " + err.response.data.message);
      });
  };

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  return (
    <div>
      {user ? (
        <div className={styles.container}>
          <div className={styles.welcome}>
            <h1>
              Welcome{" "}
              <b style={{ fontSize: "3rem", color: "#4468E2" }}>
                {user.username}
              </b>
              !
            </h1>
            <Card.Subtitle className="text-muted">
              Here is your profile information.
            </Card.Subtitle>
            <br />
          </div>
          <Card
            style={{
              width: "30rem",
              border: "none",
              paddingLeft: "1rem",
              borderRadius: "15px",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              {user.role === "user" ? (
                <div></div>
              ) : (
                <Badge pill variant="primary" bg="success">
                  Admin
                </Badge>
              )}
              <Card.Text className="mt-4 mb-4">
                <Card.Subtitle className="mb-3 text-muted">
                  Your Details
                </Card.Subtitle>
                <div className="mb-1">
                  <b>Full Name:</b> {user.name}
                </div>
                <div className="mb-2">
                  <b>Email:</b> {user.email}
                </div>
              </Card.Text>
              <Button variant="secondary" onClick={logout}>
                Log Out
              </Button>
            </Card.Body>
          </Card>
          <div className={styles.orders}>
            {!orders ? (
              <Loader />
            ) : (
              <div>
                {orders && orders.length === 0 ? (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Card.Title className="mt-5 mb-2">
                      You have no orders yet..{" "}
                      <button
                        className={styles.clickableText}
                        onClick={() => navigate("/products")}
                      >
                        Shop now
                      </button>
                    </Card.Title>
                  </div>
                ) : (
                  <div className={styles.payments}>
                    <h3 className="mb-4 mt-3">Your Orders</h3>
                    {orders.map((order, index) => (
                      <Card className="mb-5" style={{ width: "100%" }}>
                        <Card.Body>
                          <Card.Title className="mb-4">
                            Order #{index + 1}
                          </Card.Title>
                          <Card.Text>
                            {order.orderedItems &&
                              order.orderedItems.map((product, index) => (
                                <div key={index} className={styles.row}>
                                  <p style={{ width: "500px" }}>
                                    {product.itemName}
                                  </p>
                                  <p>Qty: {product.itemQuantity}</p>
                                  <p>Price: ${product.itemPrice}</p>
                                </div>
                              ))}
                            <hr />
                          </Card.Text>
                          <Badge variant="primary" className={styles.status}>
                            {order.status}
                          </Badge>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <br />
          <Button
            className={styles.deleteButton}
            onClick={toggleDeleteConfirmation}
          >
            Delete Account
          </Button>
          {showDeleteConfirmation && (
            <div className={styles.deleteConfirmation}>
              <p>Are you sure you want to delete your account?</p>
              <div className={styles.deleteButtons}>
                <Button onClick={deleteUser}>Proceed</Button>
                <Button onClick={toggleDeleteConfirmation}>Cancel</Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Profile;
