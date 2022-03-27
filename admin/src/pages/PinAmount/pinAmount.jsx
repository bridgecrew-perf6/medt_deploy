import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getPinAmounts,
  clearErrors,
  createPinAmount,
} from "../../actions/pinAmountAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_PIN_AMOUNT_RESET } from "../../constants/pinAmountConstants";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/loader/Loader";
import { getZones } from "../../actions/zoneAction";
import PinAmountList from "./pinAmountList";
import { useForm } from "react-hook-form";
import classNames from "classnames";

function PinAmount() {
  const cities = ["Patna", "Hyderabad", "Nalanda"];
  const pincodes = ["600001", "600002", "600003", "600004", "600005"];

  const alert = useAlert();
  const dispatch = useDispatch();
  const {
    register,
    getValues,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error, success } = useSelector(
    (state) => state.newPinAmount
  );
  const {
    error: zoneError,
    loading: zoneLoading,
    zones,
  } = useSelector((state) => state.zones);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("PinAmount added successfully");
      reset();
      dispatch({ type: NEW_PIN_AMOUNT_RESET });
    }
    dispatch(getZones());
  }, [dispatch, error, alert, success]);


  const onSubmit = (formData) => {
    dispatch(createPinAmount(formData));
  };
  return (
    <>
      <MetaData title="PinAmount" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="PinAmount" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding PinAmount */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Pin Amount</h3>
                  </div>
                  {/* /.card-header */}
                  <form
                    autocomplete="off"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Zones</label>
                            <select
                              {...register("zoneId", {
                                required: "Drug category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.zoneId,
                              })}
                            >
                              <option value="">Select zone</option>
                              {zones.map((zone) => (
                                <option key={zone.name} value={zone._id}>
                                  {zone.name}
                                </option>
                              ))}
                            </select>
                            {errors.zoneId && (
                              <div className="invalid-feedback">
                                {errors.zoneId.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>City/District</label>
                            <select
                              {...register("city", {
                                required: "Drug category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.city,
                              })}
                            >
                              <option value="">Select city / district</option>
                              {cities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                            {errors.city && (
                              <div className="invalid-feedback">
                                {errors.city.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Pincode</label>
                            <select
                              {...register("pincode", {
                                required: "Drug category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.pincode,
                              })}
                            >
                              <option value="">Choose pincode</option>
                              {pincodes.map((pincode) => (
                                <option key={pincode} value={pincode}>
                                  {pincode}
                                </option>
                              ))}
                            </select>
                            {errors.pincode && (
                              <div className="invalid-feedback">
                                {errors.pincode.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Area</label>
                            <input
                              type={"text"}
                              {...register("area", {
                                required: "Area is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.area,
                              })}
                              placeholder="Enter area.."
                            />
                            {errors.area && (
                              <div className="invalid-feedback">
                                {errors.area.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Delivery Charge 1</label>
                            <input
                              min="0"
                              type={"number"}
                              {...register("deliveryCharge1", {
                                required: "DeliveryCharge1 is required !!",
                                min: {
                                  value: 0,
                                  message:
                                    "DeliveryCharge1 should not be negative",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.deliveryCharge1,
                              })}
                              placeholder="Enter delivery charge.."
                              defaultValue={50}
                            />
                            {errors.deliveryCharge1 && (
                              <div className="invalid-feedback">
                                {errors.deliveryCharge1.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Amount Range 1</label>
                            <input
                              min="0"
                              type={"number"}
                              {...register("amountRange1", {
                                required: "AmountRange1 is required !!",
                                min: {
                                  value: 0,
                                  message:
                                    "AmountRange1 should not be negative",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.amountRange1,
                              })}
                              placeholder="Enter amount range.."
                              defaultValue={300}
                            />
                            {errors.amountRange1 && (
                              <div className="invalid-feedback">
                                {errors.amountRange1.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Delivery Charge 2</label>
                            <input
                              min="0"
                              type={"number"}
                              {...register("deliveryCharge2", {
                                required: "DeliveryCharge2 is required !!",
                                min: {
                                  value: 0,
                                  message:
                                    "DeliveryCharge2 should not be negative",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.deliveryCharge2,
                              })}
                              placeholder="Enter delivery charge.."
                              defaultValue={30}
                            />
                            {errors.deliveryCharge2 && (
                              <div className="invalid-feedback">
                                {errors.deliveryCharge2.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Amount Range 2</label>
                            <input
                              type={"number"}
                              min="0"
                              {...register("amountRange2", {
                                required: "AmountRange2 is required !!",
                                min: {
                                  value: 0,
                                  message:
                                    "AmountRange2 should not be negative ",
                                },
                                validate: (value) =>
                                  parseInt(value) >=
                                    parseInt(getValues("amountRange1")) ||
                                  " AmountRange2 should be greater than or equal to amountRange1 !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.amountRange2,
                              })}
                              placeholder="Enter amount range.."
                              defaultValue={500}
                            />
                            {errors.amountRange2 && (
                              <div className="invalid-feedback">
                                {errors.amountRange2.message}
                              </div>
                            )}
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
              {/* Chemical Table */}
              {loading ? <Loader /> : <PinAmountList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default PinAmount;
