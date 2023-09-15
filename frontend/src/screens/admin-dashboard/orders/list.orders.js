import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import { Button, FormControl, InputGroup } from "react-bootstrap";

import Loader from "../../../components/common/spinner";

function OrdersList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/orders")
      .then((response) => {
        setOrders(response.data.data);
        console.log(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="container">
        <h2 className="text-center mt-5 mb-5">Orders</h2>

        {orders.length > 0 ? (
          <MDBTable align="middle">
            <MDBTableHead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Ordered Items</th>
                <th scope="col">Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Total Price</th>
                <th scope="col">Address</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {orders &&
                orders.map((order, key) => (
                  <tr>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <p className="mb-1">{order._id}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <p className="mb-1">{order.customerName}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        {order.orderedProducts.map((item, key) => (
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-1">{item.itemName}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {order.orderedProducts.map((item, key) => (
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-1">{item.itemQuantity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div>
                        {order.orderedProducts.map((item, key) => (
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-1">{item.itemPrice}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <p className="mb-1">{order.totalPrice}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          <p className="mb-1">
                            {order.customerAddress.streetAddress},
                            <br />
                            {order.customerAddress.city},
                            <br />
                            {order.customerAddress.state},
                            <br />
                            {order.customerAddress.zip},
                            <br />
                            {order.customerAddress.country}.
                          </p>
                        </div>
                      </div>
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
}

export default OrdersList;
