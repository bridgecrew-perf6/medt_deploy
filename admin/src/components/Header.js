import React from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/userAction";

const Header = () => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
    navigate("/login");
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="pushmenu"
            to="#"
            role="button"
          >
            <i className="fas fa-bars" />
          </Link>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="navbar-search"
            to="#"
            role="button"
          >
            <i className="fas fa-search" />
          </Link>
          <div className="navbar-search-block">
            <form className="form-inline">
              <div className="input-group input-group-sm">
                <input
                  className="form-control form-control-navbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fas fa-search" />
                  </button>
                  <button
                    className="btn btn-navbar"
                    type="button"
                    data-widget="navbar-search"
                  >
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            data-widget="fullscreen"
            to="#"
            role="button"
          >
            <i className="fas fa-expand-arrows-alt" />
          </Link>
        </li>
        <li className="nav-item dropdown">
          <Link
            className="nav-link"
            data-toggle="dropdown"
            data-widget="control-sidebar"
            data-slide="true"
            to="#"
            role="button"
          >
            <i className="fas fa-user-circle" />
          </Link>
          {loading ? (
            "Loading.."
          ) : (
            <div className="dropdown-menu dropdown-menu-md p-0 dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                <div className="media d-flex align-items-center">
                  <img
                    src="../../dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-32  img-circle"
                  />
                  <div className="media-body pl-2">
                    <h5 className="mb-0">{`${user.name}`} </h5>
                  </div>
                </div>
              </span>
              <div className="dropdown-divider m-0" />
              <Link to="/profile" className="dropdown-item ">
                <i className="fas fa-user mr-2" /> View Profile
              </Link>
              <div className="dropdown-divider m-0" />
              <Link to={`/password/update`} className="dropdown-item ">
                <i className="fa fa-key mr-2" /> Change Password
              </Link>
              <div className="dropdown-divider m-0" />
              <Link to="" className="dropdown-item" onClick={logoutUser}>
                <i className="fas fa-sign-out-alt mr-2" /> Logout
              </Link>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Header;
