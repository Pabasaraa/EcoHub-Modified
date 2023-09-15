import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import styles from "./styles/dashboard.module.css";

import Sidebar from "../../components/admin/Sidebar.js";

import AddProducts from "./products/add.product.js";
import ListProducts from "./products/list.products.js";
import UpdateProduct from "./products/update.product.js";

import AddSeminar from "../seminar/add.seminar.js";
import SeminarManage from "../seminar/seminar.manage.js";
import UpdateSeminar from "../seminar/update.seminar.js";

import OrdersList from "./orders/list.orders.js";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <Sidebar />

      <Container className={styles.content}>
        <Routes>
          <Route
            path="/"
            element={
              <div className="text-center mt-5">
                <h1>Select the page you want to access!</h1>
                <p>Use the right side nav</p>
              </div>
            }
          />

          <Route path="products/add" element={<AddProducts />} />
          <Route path="products" element={<ListProducts />} />
          <Route path="products/update/:id" element={<UpdateProduct />} />

          <Route path="schedule/seminar" element={<AddSeminar />} />
          <Route path="all/seminars" element={<SeminarManage />} />
          <Route path="update/seminars/:id" element={<UpdateSeminar />} />

          <Route path="orders" element={<OrdersList />} />
        </Routes>
      </Container>
    </div>
  );
};

export default Dashboard;
