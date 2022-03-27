import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, forgotPassword } from "../actions/employeeAction";
import MetaData from "../layout/MetaData";
import Loader from "./../components/loader/Loader"

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("email", email);
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message]);
  return (
    <>
      <MetaData title="Forgot Password" />
      {loading ? (
        <Loader />
      ) : (
        <div class="hold-transition login-page">
          <div className="login-box">
            <div className="card card-outline card-primary">
              <div className="card-header text-center">
                <Link to="." className="h1">
                  <b>Dawai</b>India
                </Link>
              </div>
              <div className="card-body">
                <p className="login-box-msg">
                  You forgot your password? Here you can easily retrieve a new
                  password.
                </p>
                <form onSubmit={forgotPasswordSubmit} method="post">
                  <div className="input-group mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <div className="input-group-append">
                      <div className="input-group-text">
                        <span className="fas fa-envelope" />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Request new password
                      </button>
                    </div>
                    {/* /.col */}
                  </div>
                </form>
                <p className="mt-3 mb-1">
                  <Link to="../login">Login</Link>
                </p>
              </div>
              {/* /.login-card-body */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
