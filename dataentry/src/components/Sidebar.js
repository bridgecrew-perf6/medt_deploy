import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link ">
        <img
          src="dist/img/logo/dawai-logo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">Dataentry</span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/logo/dawai-logo.png"
              className="img-circle elevation-2"
              alt="User Profile"
            />
          </div>
          <div className="info">
            <Link to="#" className="d-block">
              Admin Name
            </Link>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline"></div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-header">Products</li>
            <li className="nav-item">
              <Link to="/drugs" className="nav-link">
                <i className="fa fa-capsules ml-2 mr-1" />
                <p>Drug List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-drug" className="nav-link">
                <i className="fa fa-capsules ml-2 mr-1" />
                <p>Add Drug</p>
              </Link>
            </li>
            <li className="nav-header">Products</li>
            <li className="nav-item">
              <Link to="/products" className="nav-link">
                <i className="fa fa-dumpster ml-2 mr-1" />
                <p>Product List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-product" className="nav-link">
                <i className="fa fa-dumpster ml-2 mr-1" />
                <p>Add Product</p>
              </Link>
            </li>
            <li className="nav-header">Devices</li>
            <li className="nav-item">
              <Link to="/devices" className="nav-link">
                <i className="fa fa-laptop-medical ml-2 mr-1" />
                <p>Device List</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-device" className="nav-link">
                <i className="fa fa-laptop-medical ml-2 mr-1" />
                <p>Add Device</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </div>
  );
}
