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
        <span className="brand-text font-weight-light">Zone Panel</span>
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
              <Link to="/products" className="nav-link">
                <i class="fa-solid fa-mask-face nav-icon"></i>
                <p>Products</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/drugs" className="nav-link">
                <i className="nav-icon fa fa-capsules " />
                <p>Drugs</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/devices" className="nav-link">
                <i class="fa-solid fa-laptop-medical nav-icon"></i>
                <p>Devices</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                {/* <i className="nav-icon fa fa-banner" /> */}
                <i class="fa-solid nav-icon fa-panorama"></i>
                <p>
                  Sliders &amp; Banners
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/sliders" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Sliders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/banners" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-2"></i>
                    <p>Banners</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link">
                <i class="fa-solid nav-icon fa-gift"></i>
                <p>
                  Coupons
                  <i class="right fas fa-angle-left"></i>
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/general-coupons" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>General Coupon</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/single-coupons" className="nav-link">
                    <i className=" fa-solid fa-play ml-2 mr-2" />
                    <p>Single Coupon</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/delivery-area" className="nav-link">
                <i className=" far fa-map nav-icon" />
                <p>Delivery Area</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link ">
                <i className="nav-icon far fa-plus-square" />
                <p>
                  Reports &amp; Settings
                  <i className="fas fa-angle-left right" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/clients" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>ClientData</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Processing items</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/update-payment" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Update Payment</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/new-order" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>New Order</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/edit-order" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Edit Order</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/update-order-status" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Change order status</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/product-seo" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Product SEO</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/delivered-export" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Delivered Export</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Export</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/web-settings" className="nav-link">
                    <i class="fa-solid fa-check ml-2 mr-1"></i>
                    <p>Web Settings</p>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="#" className="nav-link ">
                <i class="nav-icon fa-solid fa-handshake"></i>
                <p>
                  Orders
                  <i className="fas fa-angle-left right" />
                </p>
              </Link>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <Link to="/booked-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Booked Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/processing-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Processing Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/dispatch-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Dispatch Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/deliver-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Deliver Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/delivered-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Delivered Orders</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cancelled-orders" className="nav-link">
                    <i class="fa-solid fa-play ml-2 mr-2"></i>
                    <p>Cancelled</p>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </div>
  );
}
