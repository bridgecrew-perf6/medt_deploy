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
        <span className="brand-text font-weight-light">Admin Panel</span>
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
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="nav-icon fa fa-users" />
                <p>
                  Employee
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/employee" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Employee Details</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-employee" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Add Employee</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i class="nav-icon fa fa-capsules"></i>
                <p>
                  Drugs
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/drugs" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Drug List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-drug" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Add Drug</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="fa fa-solid fa-mask-face nav-icon"></i>
                <p>
                  Products
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Product List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-product" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Add Product</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i className="fa fa-solid fa-laptop-medical nav-icon"></i>
                <p>
                  Devices
                  <i className="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/devices" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Device List</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add-device" className="nav-link">
                    <i class="fa-solid fa-check ml-4 mr-2"></i>
                    <p>Add Device</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="drug-category" className="nav-link">
                <i className="nav-icon fas fa-pills" />
                <p>Drug Category</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="device-category" className="nav-link">
                <i className="nav-icon fas fa-pills" />
                <p>Device Category</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="product-category" className="nav-link">
                <i className="nav-icon fas fa-pills" />
                <p>Product Category</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="zone" className="nav-link">
                <i className="nav-icon fa fa-map-marker" />
                <p>Zones</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="pin-amount" className="nav-link">
                <i class="nav-icon fa fa-solid fa-indian-rupee-sign"></i>
                <p>Pin Amount</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="chemicals" className="nav-link">
                <i class="nav-icon fa fa-solid fa-flask"></i>
                <p>Chemicals</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="diseases" className="nav-link">
                <i class="nav-icon fa fa-solid fa-virus-covid"></i>
                <p>Diseases</p>
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
