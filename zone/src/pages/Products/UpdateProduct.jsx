import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../../components/loader/Loader";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { useNavigate, useParams } from "react-router-dom";
import {
  clearErrors,
  getProductPriceDetailsByProductZoneId,
  updateProductPriceByProductZoneId,
} from "../../actions/productPriceAction";
import { UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_RESET } from "../../constants/productPriceConstants";

export default function UpdateProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Product Price Details
  const {
    loading: productPriceDetailsLoading,
    error: productPriceDetailsError,
    productPrice,
  } = useSelector((state) => state.productPriceDetails);
  // Update Product Price
  const { loading, error, isUpdated } = useSelector(
    (state) => state.productPrice
  );
  // Employees
  const { employee } = useSelector((state) => state.employee);

  const productId = params.id;
  const zoneId = employee.zoneId;

  useEffect(() => {
    if (productPrice && productPrice.productId !== productId) {
      dispatch(getProductPriceDetailsByProductZoneId(productId, zoneId));
    } else {
      var productPriceData = productPrice;
      reset(productPriceData);
    }

    if (productPriceDetailsError) {
      alert.error(productPriceDetailsError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_PRICE_BY_PRODUCT_ZONE_ID_RESET });
      reset();
      reset((productPriceData = ""));
      navigate("/products");
    }
  }, [
    dispatch,
    alert,
    error,
    productId,
    navigate,
    isUpdated,
    productPriceDetailsError,
    productPrice,
    zoneId,
    reset,
  ]);

  const onSubmit = (formData) => {
    const productPricesForm = new FormData();

    const discount = Math.round(
      ((formData.mrp - formData.price) * 100) / formData.mrp
    );

    productPricesForm.set("mrp", formData.mrp);
    productPricesForm.set("price", formData.price);
    productPricesForm.set("stocks", formData.stocks);
    productPricesForm.set("offers", formData.offers);
    productPricesForm.set("discounts", discount);
    productPricesForm.set("hot", formData.hot);
    productPricesForm.set("trending", formData.trending);
    productPricesForm.set("status", formData.status);

    dispatch(
      updateProductPriceByProductZoneId(productId, zoneId, productPricesForm)
    );
  };

  return (
    <>
      <MetaData title="Update product price" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Update product price" />
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card card-success">
                    <div className="card-header">
                      <h3 className="card-title">General details</h3>
                    </div>
                    {/* /.card-header */}
                    <form
                      encType="multipart/form-data"
                      id="productSubmitForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>MRP</label>
                              <input
                                autoComplete="off"
                                type="number"
                                {...register("mrp", {
                                  required: "Mrp is required !!",
                                  min: {
                                    value: 0,
                                    message: "Please enter mrp greater than 0",
                                  },
                                })}
                                className={classNames("form-control", {
                                  "is-invalid": errors.mrp,
                                })}
                                placeholder="Enter products mrp..."
                                min="0"
                                id="mrpInput"
                              />
                              {errors.mrp && (
                                <div className="invalid-feedback">
                                  {errors.mrp.message}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Price</label>
                              <input
                                autoComplete="off"
                                type="number"
                                {...register("price", {
                                  required: "Price is required !!",
                                  min: {
                                    value: 0,
                                    message:
                                      "Please enter price greater than 0",
                                  },
                                  validate: (value) =>
                                    parseFloat(value) <=
                                      parseFloat(getValues("mrp")) ||
                                    " Price should be less than or equal to mrp !!",
                                })}
                                className={classNames("form-control", {
                                  "is-invalid": errors.price,
                                })}
                                placeholder="Enter selling price..."
                                id="priceInput"
                                min="0"
                              />
                              {errors.price && (
                                <div className="invalid-feedback">
                                  {errors.price.message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Offers</label>
                              <input
                                autoComplete="off"
                                min={0}
                                type="number"
                                className="form-control"
                                placeholder="Enter meta title ..."
                                {...register("offers")}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Stocks</label>
                              <input
                                autoComplete="off"
                                min={0}
                                type="number"
                                className="form-control"
                                placeholder="Enter meta title ..."
                                {...register("stocks")}
                              />
                            </div>
                          </div>
                          {/* <div className="row">
                            <div className="col-sm-6">
                            <div className="form-group">
                              <label>Discounts</label>
                              <input
                                autoComplete="off"
                                min={0}
                                type="number"
                                className="form-control"
                                placeholder="Enter meta title ..."
                                {...register("discounts")}
                              />
                            </div>
                          </div>
                          </div> */}
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  autoComplete="off"
                                  type="checkbox"
                                  {...register("hot")}
                                  id="hot"
                                />
                                hot
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  autoComplete="off"
                                  type="checkbox"
                                  {...register("trending")}
                                  // onChange={(e) => setTrending(e.target.checked)}
                                  id="trending"
                                />
                                trending
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <label className="form-check-label">
                                <input
                                  className="form-check-input"
                                  autoComplete="off"
                                  type="checkbox"
                                  {...register("status")}
                                  // onChange={(e) => setGeneric(e.target.checked)}
                                  id="status"
                                />
                                status
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <button
                          autoComplete="off"
                          type="submit"
                          className="btn btn-primary"
                          disabled={loading ? true : false}
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
