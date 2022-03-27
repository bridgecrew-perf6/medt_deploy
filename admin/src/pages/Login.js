import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, userLogin } from "./../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import Loader from "../components/loader/Loader";

export default function Login({ location }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(loginEmail, loginPassword));
  };

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);
  return (
    <>
      <MetaData title="Login" />
      {loading ? (
        <Loader />
      ) : (
        <div class="hold-transition login-page">
          <div className="login-box">
            {/* /.login-logo */}
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <Link to="." className="h1">
                  <b>Admin</b>Login
                </Link>
              </div>
              <div className="card-body">
                <p className="login-box-msg">Sign in to start your session</p>
                <form onSubmit={loginSubmit}>
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-lock" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-8">
                      <p className="">
                        <Link to="/password/forgot">I forgot my password</Link>
                      </p>
                    </div>
                    {/* /.col */}
                    <div className="col-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
        </div>
      )}
    </>
  );
}
