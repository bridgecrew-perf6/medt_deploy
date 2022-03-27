import React from "react";
import { Link } from "react-router-dom";
import MetaData from "../../layout/MetaData";
import "./Error404.css";

export default function Error404() {
  return (
    <>
      <MetaData title="Error 404" />
      {/* <section className="content">
        <div className="error-page">
          <h2 className="headline text-warning"> 404</h2>
          <div className="error-content">
            <h3>
              <i className="fas fa-exclamation-triangle text-warning" /> Oops!
              Page not found.
            </h3>
            <p>
              We could not find the page you were looking for. Meanwhile, you
              may <a href="../../index.html">return to dashboard</a> or try
              using the search form.
            </p>
            <form className="search-form">
              <div className="input-group">
                <input
                  type="text"
                  name="search"
                  className="form-control"
                  placeholder="Search"
                />
                <div className="input-group-append">
                  <button
                    type="submit"
                    name="submit"
                    className="btn btn-warning"
                  >
                    <i className="fas fa-search" />
                  </button>
                </div>
              </div>
              {/* /.input-group */}
      {/* </form>
          </div> */}
      {/* /.error-content */}
      {/* </div> */}
      {/* /.error-page */}
      {/*</section> */}

      <div className="ErrorPage">
        <div className="number">404</div>
        <div className="text">
          <span>Ooops...</span>
          <br />
          page not found
        </div>
        <Link className="me" to="./">
          Goto Home
        </Link>
      </div>
    </>
  );
}
