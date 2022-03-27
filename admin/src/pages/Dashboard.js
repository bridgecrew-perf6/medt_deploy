import React, { useEffect, Fragment } from "react";
import ContentHeader from "../components/ContentHeader";
import MetaData from "../layout/MetaData";
import { clearErrors, getAllProducts } from "../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../components/loader/Loader";
import { Navigate, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      Navigate("/login");
    }
  }, [dispatch, alert]);

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
        <>
          <MetaData title="Dashboard" />
          <div className="content-wrapper">
            <ContentHeader title="Dashboard" />
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                      <div className="inner">
                        <h3>150</h3>
                        <p>New Orders</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-bag" />
                      </div>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                      <div className="inner">
                        <h3>
                          53<sup style={{ fontSize: 20 }}>%</sup>
                        </h3>
                        <p>Bounce Rate</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-stats-bars" />
                      </div>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                      <div className="inner">
                        <h3>44</h3>
                        <p>User Registrations</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add" />
                      </div>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-6">
                    <div className="small-box bg-danger">
                      <div className="inner">
                        <h3>65</h3>
                        <p>Unique Visitors</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pie-graph" />
                      </div>
                      <a href="#" className="small-box-footer">
                        More info <i className="fas fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      {/* )} */}
    </Fragment>
  );
};
export default Dashboard;
