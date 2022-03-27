import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getDeviceDetails,
  updateDevice,
} from "../../actions/deviceAction";
import { useAlert } from "react-alert";
import {
  UPDATE_DEVICE_RESET,
  UPDATE_DEVICE_SUCCESS,
} from "../../constants/deviceConstants";
import Loader from "../../components/loader/Loader";
// import { getDeviceCategorys } from "../../actions/deviceCategoryAction";
import { getZones } from "../../actions/zoneAction";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";
import { getAdminDeviceCategorys } from "../../actions/deviceCategoryAction";

export default function UpdateDevice() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    error: zoneError,
    loading: zoneLoading,
    zones,
  } = useSelector((state) => state.zones);
  const { error: deviceCategoryError, deviceCategorys } = useSelector(
    (state) => state.deviceCategorys
  );
  const { employee } = useSelector((state) => state.employee);
  // const deviceCategorys = [
  //   { name: "India" },
  //   { name: "China" },
  //   { name: "America" },
  //   { name: "India" },
  //   { name: "Russia" },
  // ];

  const { loading, error, isUpdated } = useSelector((state) => state.device);
  const {
    loading: deviceDetailsLoading,
    error: deviceDetailsError,
    device,
  } = useSelector((state) => state.deviceDetails);

  const deviceId = params.id;
  useEffect(() => {
    if (device && device._id !== deviceId) {
      dispatch(getDeviceDetails(deviceId));
    } else {
      var deviceData = device;
      reset(deviceData);
    }

    if (deviceDetailsError) {
      alert.error(deviceDetailsError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Device Updated Successfully");
      dispatch({ type: UPDATE_DEVICE_RESET});
      reset();
      reset((deviceData = ""));
      navigate("/devices");
    }

    // if (deviceCategoryError) {
    //   alert.error(deviceCategoryError);
    //   dispatch(clearErrors());
    // }

    dispatch(getAdminDeviceCategorys());

    dispatch(getZones());
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    device,
    deviceId,
    deviceDetailsError,
    reset,
  ]);

  const onSubmit = (formData) => {
    const random = (Math.random() + 1).toString(36).substring(7);

    var selectedCategory = $("#categoryDropdown")
      .children("option")
      .filter(":selected")
      .text();
    var newKeywords = `${formData.keywords} ${formData.name} ${selectedCategory}`;
    newKeywords = newKeywords.toLowerCase();
    console.log(formData);
    console.log(selectedCategory);

    var slugUrl = `medicine-${selectedCategory}-${formData.name}-${formData.brand}-${random}`;
    slugUrl = slugUrl
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    slugUrl = slugUrl.replaceAll(/---/g, "-");
    slugUrl = slugUrl.replaceAll(/--/g, "-");

    const devicesForm = new FormData();

    devicesForm.set("name", formData.name);
    devicesForm.set("category", formData.category);
    devicesForm.set("description", formData.description);
    devicesForm.set("keywords", newKeywords);
    devicesForm.set("packSize", formData.packSize);
    devicesForm.set("hot", formData.hot);
    devicesForm.set("trending", formData.trending);
    devicesForm.set("brand", formData.brand);
    devicesForm.set("desktopImg", formData.desktopImg);
    devicesForm.set("mobileImg", formData.mobileImg);
    devicesForm.set("ingredients", formData.ingredients);
    devicesForm.set("deviceInfo", formData.deviceInfo);
    devicesForm.set("otherDetails", formData.otherDetails);
    devicesForm.set("metaTitle", formData.metaTitle);
    devicesForm.set("metaKeywords", formData.metaKeywords);
    devicesForm.set("metaDescription", formData.metaDescription);
    devicesForm.set("slugUrl", slugUrl);

    dispatch(updateDevice(deviceId, devicesForm));
  };

  return (
    <>
      <MetaData title="Add devices" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Add devices" />
          <section className="content">
            <div className="container-fluid">
              <div classname="row">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">General details</h3>
                  </div>
                  {/* /.card-header */}
                  <form
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Name *</label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Device name is required !!",
                                minLength: {
                                  value: 5,
                                  message:
                                    "Please enter name minimum 5 characters",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.name,
                              })}
                              placeholder="Enter devices name ..."
                              // value={name}
                              // onChange={(e) => setName(e.target.value)}
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Devices category</label>
                            <select
                              {...register("category", {
                                required: "Device category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.category,
                              })}
                              id="categoryDropdown"
                            >
                              <option value="">Select category</option>
                              {deviceCategorys.map((deviceCategory) => (
                                <option
                                  selected={
                                    deviceCategory._id === device.category
                                      ? "selected"
                                      : ""
                                  }
                                  key={deviceCategory.name}
                                  value={deviceCategory._id}
                                >
                                  {deviceCategory.name}
                                </option>
                              ))}
                            </select>
                            {errors.category && (
                              <div className="invalid-feedback">
                                {errors.category.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Keywords</label>
                            <textarea
                              rows={3}
                              {...register("keywords")}
                              className="form-control"
                              placeholder="Enter keywords for search results.."
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Description</label>
                            <textarea
                              rows={3}
                              className="form-control"
                              {...register("description")}
                              placeholder="Enter description ..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Brand name</label>
                            <input
                              className="form-control"
                              type={"text"}
                              {...register("brand")}
                              placeholder="Enter brand name..."
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>packSize</label>
                            <input
                              type="number"
                              {...register("packSize")}
                              className="form-control"
                              placeholder="Enter pack size..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* <div className="col-sm-6">
                        <div className="form-group">
                          <label>Stocks</label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Enter selling price..."
                            value={stocks}
                            onChange={(e) => setStocks(e.target.value)}
                          />
                        </div>
                      </div> */}
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Desktop Image</label>
                            <input
                              type="file"
                              {...register("deskImg")}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Mobile Image</label>
                            <input
                              type="file"
                              {...register("mobileImg")}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <div class="form-check form-check-inline">
                            <label class="form-check-label">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                {...register("hot")}
                                id=""
                              />
                              hot
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <label class="form-check-label">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                {...register("trending")}
                                id=""
                              />
                              trending
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card card-success">
                      <div className="card-header">
                        <h3 className="card-title">Extra details</h3>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Specifications</label>
                              <textarea
                                rows={3}
                                {...register("specifications")}
                                className="form-control"
                                placeholder="Enter specifications ..."
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Device Information</label>
                              <textarea
                                rows={3}
                                className="form-control"
                                {...register("deviceInfo")}
                                placeholder="Enter uses ..."
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Other Details</label>
                              <textarea
                                rows={5}
                                {...register("otherDetails")}
                                className="form-control"
                                placeholder="Enter other details.."
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card card-success">
                      <div className="card-header">
                        <h3 className="card-title">Device SEO</h3>
                      </div>
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Meta title</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("metaTitle")}
                                placeholder="Enter meta title ..."
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Meta Keywords</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("metaKeywords")}
                                placeholder="Enter meta keywords ..."
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Meta descriptions</label>
                              <textarea
                                rows={3}
                                className="form-control"
                                {...register("metaDescription")}
                                placeholder="Enter meta descriptions ..."
                              />
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
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
