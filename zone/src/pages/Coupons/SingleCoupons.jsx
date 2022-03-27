import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getChemicals,
  clearErrors,
  createChemical,
} from "../../actions/chemicalAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_CHEMICAL_RESET } from "../../constants/chemicalConstants";
import ContentHeader from "../../components/ContentHeader";
import SingleCouponList from "./SingleCouponList";
import Loader from "../../components/loader/Loader";

function SingleCoupon() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newChemical);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("SingleCoupon added successfully");
      dispatch({ type: NEW_CHEMICAL_RESET });
      dispatch({ type: getChemicals });
      dispatch({ type: createChemical });
    }
  }, [dispatch, error, alert, success]);

  const createChemicalSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createChemical(name, description));
  };
  return (
    <>
      <MetaData title="SingleCoupon" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="SingleCoupon" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding SingleCoupon */}
              <div classname="row">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">Add Single Coupon</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createChemicalSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Coupon Name:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Coupon code ..."
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Coupon Type:
                            </label>
                            <div className="col-sm-9">
                              <select className="form-control">
                                <option> Fixed Discount</option>
                              </select>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Value:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter value ..."
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Times:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter GeneralCoupon name ..."
                                value={"1"}
                                disabled
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Client Id:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter client id ..."
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              From Date:
                            </label>
                            <div className=" col-sm-9">
                              <input type="date" className="form-control" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              To Date:
                            </label>
                            <div className=" col-sm-9">
                              <input type="date" className="form-control" />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Maximum Discount:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter maximum discount..."
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Minimum Amount:
                            </label>
                            <div className="col-sm-9">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter minimum amount..."
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Payment Type:
                            </label>
                            <div className="col-sm-9">
                              <select className="form-control">
                                <option> All</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading ? true : false}
                      >
                        Add
                      </button>
                    </div>
                  </form>
                  {/* /.card-body */}
                </div>
              </div>

              {/* SingleCoupon Table */}
              {loading ? <Loader /> : <SingleCouponList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default SingleCoupon;
