import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { clearErrors } from "../../actions/employeeAction";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/loader/Loader";
import MetaData from "../../layout/MetaData";

const Profile = ({ history }) => {
  const navigate = useNavigate();
  const { employee, loading, isAuthenticated } = useSelector((state) => state.employee);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Profile" />
          <div className="content-wrapper">
            <ContentHeader title="Profile" />
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  {/* /.col */}
                  <div className="col-md-12">
                    <div className="card">
                      <div className="card-header p-2">
                        <ul className="nav nav-pills">
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              href="#settings"
                              data-toggle="tab"
                            >
                              Settings
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <div className="tab-content">
                          <div className="tab-pane active" id="settings">
                            <form className="form-horizontal">
                              <div className="form-group row">
                                <label
                                  htmlFor="inputName"
                                  className="col-sm-2 col-form-label"
                                >
                                  Name
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputName"
                                    disabled
                                    value={employee.name}
                                    placeholder="Name"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-2 col-form-label"
                                >
                                  Email
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="inputEmail"
                                    disabled
                                    value={employee.email}
                                    placeholder="Email"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <label
                                  htmlFor="inputEmail"
                                  className="col-sm-2 col-form-label"
                                >
                                  Role
                                </label>
                                <div className="col-sm-10">
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="inputEmail"
                                    disabled
                                    value={employee.role}
                                    placeholder="Role"
                                  />
                                </div>
                              </div>
                              <div className="form-group row">
                                <div className="offset-sm-2 col-sm-10">
                                  <button
                                    type="submit"
                                    className="btn btn-danger"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Profile;
