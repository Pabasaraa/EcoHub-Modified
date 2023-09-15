import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

//import css file from style sheets directory
import styles from "./styles/checkout.module.css";

const Checkout = () => {
  const [transactionDetails, setTransactionDetails] = useState({});
  const [paymentDetails] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const retrieveData = () => {
      const details = JSON.parse(localStorage.getItem("transactionDetails"));

      setTransactionDetails(details);
    };

    retrieveData();
  }, []);

  const processPayment = async () => {
    const paymentData = {
      cardHoler: paymentDetails.cardHolder,
      cardNumber: paymentDetails.cardNumber,
      expirationDate: paymentDetails.expiryDate,
      securityCode: paymentDetails.cvv,
      billingAddress: transactionDetails.shippingDetails,
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems"));

    console.log(paymentData);
    const customerAddress =
      transactionDetails.shippingMethod === "home_delivery"
        ? transactionDetails.shippingDetails
        : "Store pickcup";

    const orderData = {
      token: localStorage.getItem("token"),
      customerName: paymentDetails.customerName,
      customerId: paymentDetails.customerId,
      customerAddress: customerAddress,
      orderedProducts: cartItems,
      totalPrice: transactionDetails.total,
      shippingOption: transactionDetails.shippingOption,
    };

    alert("processing Payment! Please Wait...");

    await axios.post("http://localhost:8000/orders/new", orderData).then(() => {
      localStorage.removeItem("cartItems");
      localStorage.removeItem("transactionDetails");

      alert("Order Placed Successfully");
      navigate("/products");
    });
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.subContainer}>
        <div className={styles.flexContainer}>
          <div className={styles.flexChild}>
            <div className={styles.inputContainer}>
              <p className={`text-center margin-bottom ${styles.headertext}`}>
                <b>Checkout</b>
              </p>
              <form className="formt" style={{ margin: "0px 50px 0px 50px" }}>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="form-group">
                    <label
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCard"
                      pattern="\d*"
                      placeholder="Full Name"
                      onChange={(e) => {
                        paymentDetails.cardHolder = e.target.value;
                      }}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="form-group">
                    <label
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      Card Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCard"
                      pattern="\d*"
                      placeholder="Card Number"
                      onChange={(e) => {
                        paymentDetails.cardNumber = e.target.value;
                      }}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
                <div className="row" style={{ marginTop: "15px" }}>
                  <div className="form-group col-md-4">
                    <label
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputExpiryDate"
                      placeholder="Expiry Date"
                      onChange={(e) => {
                        paymentDetails.expiryDate = e.target.value;
                      }}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                  <div className="form-group col-md-4">
                    <label
                      className={styles.label}
                      style={{ marginBottom: "10px" }}
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCvv"
                      placeholder="Cvv"
                      onChange={(e) => {
                        paymentDetails.cvv = e.target.value;
                      }}
                      style={{ paddingLeft: "15px" }}
                    />
                  </div>
                </div>
                <div className="mt-4 mb-4">
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="form-group">
                      <label
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputStreet"
                        placeholder="Street Address"
                        defaultValue={
                          transactionDetails.shippingDetails
                            ? transactionDetails.shippingDetails.streetAddress
                            : ""
                        }
                        onChange={(e) => {
                          transactionDetails.shippingDetails.streetAddress =
                            e.target.value;
                        }}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className={`form-group`}>
                      <label
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCountry"
                        placeholder="Country"
                        defaultValue={
                          transactionDetails.shippingDetails
                            ? transactionDetails.shippingDetails.country
                            : ""
                        }
                        onChange={(e) => {
                          transactionDetails.shippingDetails.country =
                            e.target.value;
                        }}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="form-group">
                      <label
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        City
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCard"
                        pattern="\d*"
                        placeholder="City"
                        defaultValue={
                          transactionDetails.shippingDetails
                            ? transactionDetails.shippingDetails.city
                            : ""
                        }
                        onChange={(e) => {
                          transactionDetails.shippingDetails.city =
                            e.target.value;
                        }}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                  <div
                    className="row"
                    style={{ marginTop: "15px", marginBottom: "55px" }}
                  >
                    <div className="form-group col-md-6">
                      <label
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        State
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputExpiryDate"
                        placeholder="State"
                        defaultValue={
                          transactionDetails.shippingDetails
                            ? transactionDetails.shippingDetails.state
                            : ""
                        }
                        onChange={(e) => {
                          transactionDetails.shippingDetails.state =
                            e.target.value;
                        }}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label
                        className={styles.label}
                        style={{ marginBottom: "10px" }}
                      >
                        Zip Code
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputCvv"
                        placeholder="Zip"
                        defaultValue={
                          transactionDetails.shippingDetails
                            ? transactionDetails.shippingDetails.zip
                            : ""
                        }
                        onChange={(e) => {
                          transactionDetails.shippingDetails.zip =
                            e.target.value;
                        }}
                        style={{ paddingLeft: "15px" }}
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className={styles.flexChild}
            style={{ backgroundColor: "white" }}
          >
            <div className={styles.summaryMainContainer}>
              <h3 style={{ color: "#191818", marginBottom: "35px" }}>
                <b>Order Summary</b>
              </h3>
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Subtotal</h6>
                </div>
                <div>
                  <h6>{transactionDetails.subtotal} LKR</h6>
                </div>
              </div>
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Shipping Charge</h6>
                </div>
                <div>
                  <h6>{transactionDetails.shippingPrice} LKR</h6>
                </div>
              </div>
              <hr
                className={styles.divider}
                style={{ margin: "25px 10px 25px 10px" }}
              />
              <div
                className={`${styles.summaryContainer} ${styles.summaryElements}`}
              >
                <div className={styles.summaryChild}>
                  <h6>Total</h6>
                </div>
                <div>
                  <h6>{transactionDetails.total} LKR</h6>
                </div>
              </div>
              <div className="text-center">
                <button className={styles.payBtn} onClick={processPayment}>
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Checkout;
