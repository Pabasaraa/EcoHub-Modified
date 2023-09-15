import React, { useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { Link, NavLink } from "react-router-dom";

import styles from "./styles/sidebar.module.css";

const Sidebar = () => {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const [showSeminarsDropdown, setShowSeminarsDropdown] = useState(false);
  const [showArticlesDropdown, setShowArticlesDropdown] = useState(false);

  const handleProductsDropdown = () => {
    setShowProductsDropdown(!showProductsDropdown);
  };

  const handleSeminarsDropdown = () => {
    setShowSeminarsDropdown(!showSeminarsDropdown);
  };

  const handleArticlesDropdown = () => {
    setShowArticlesDropdown(!showArticlesDropdown);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "calc(100vh - 63px)",
        overflow: "scroll initial",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <CDBSidebar textColor="#0000008C" className=" navbar-light bg-light">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <p className="text-decoration-none" style={{ color: "inherit" }}>
            EcoHub Admin
          </p>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <div onClick={handleProductsDropdown}>
              <CDBSidebarMenuItem icon="box" className={styles.links}>
                Products
                <i
                  style={{ marginLeft: "5px" }}
                  className={
                    showProductsDropdown
                      ? "fa fa-caret-down"
                      : "fa fa-caret-right"
                  }
                ></i>
              </CDBSidebarMenuItem>
              {showProductsDropdown && (
                <div style={{ marginLeft: 20 }}>
                  <NavLink
                    exact
                    to="products/add"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem
                      icon="box-open"
                      className={styles.links}
                    >
                      Add Products
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to="products"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem icon="boxes" className={styles.links}>
                      All Products
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>
            <div onClick={handleSeminarsDropdown}>
              <CDBSidebarMenuItem icon="box" className={styles.links}>
                Seminars
                <i
                  style={{ marginLeft: "5px" }}
                  className={
                    showSeminarsDropdown
                      ? "fa fa-caret-down"
                      : "fa fa-caret-right"
                  }
                ></i>
              </CDBSidebarMenuItem>
              {showSeminarsDropdown && (
                <div style={{ marginLeft: 20 }}>
                  <NavLink
                    exact
                    to="schedule/seminar"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem
                      icon="box-open"
                      className={styles.links}
                    >
                      Schedule Seminar
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to="all/seminars"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem icon="boxes" className={styles.links}>
                      All Seminars
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>
            <div onClick={handleArticlesDropdown}>
              <CDBSidebarMenuItem icon="book" className={styles.links}>
                Articles
                <i
                  style={{ marginLeft: "5px" }}
                  className={
                    showArticlesDropdown
                      ? "fa fa-caret-down"
                      : "fa fa-caret-right"
                  }
                ></i>
              </CDBSidebarMenuItem>
              {showArticlesDropdown && (
                <div style={{ marginLeft: 20 }}>
                  <NavLink
                    exact
                    to="#"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem
                      icon="box-open"
                      className={styles.links}
                    >
                      Create Article
                    </CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink
                    exact
                    to="#"
                    activeClassName="activeClicked"
                    className="text-white"
                  >
                    <CDBSidebarMenuItem icon="boxes" className={styles.links}>
                      All Articles
                    </CDBSidebarMenuItem>
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink exact to="orders" activeClassName="activeClicked">
              <CDBSidebarMenuItem className={styles.links} icon="book-open">
                Orders
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem className={styles.links} icon="user">
                Users
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="#" activeClassName="activeClicked">
              <CDBSidebarMenuItem className={styles.links} icon="chart-line">
                Submissions
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div style={{ padding: "20px 5px" }}>
            <Link
              style={{ textDecoration: "none" }}
              onClick={() => {
                alert("logged out");
              }}
            >
              <CDBSidebarMenuItem icon="sign-out-alt">
                Sign out
              </CDBSidebarMenuItem>
            </Link>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
