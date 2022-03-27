import React, { useEffect } from "react";
import { Header, Sidebar, Footer } from "../components";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";

export default function MainLayout() {
  const navigate = useNavigate();
  const {loading, isAuthenticated } =  useSelector((state) => state.employee);

  useEffect(() => {
    if (isAuthenticated === false) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" hold-transition layout-navbar-fixed">
          <div className="wrapper">
            <Header />
            <Sidebar />
            <Outlet />
            <Footer />
          </div>
        </div>
      )}
    </>
  );
}
