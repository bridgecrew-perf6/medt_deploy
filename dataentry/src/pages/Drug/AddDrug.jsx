import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createDrug } from "../../actions/drugAction";
import { useAlert } from "react-alert";
import { NEW_DRUG_RESET } from "../../constants/drugConstants";
import Loader from "../../components/loader/Loader";
import { getZones } from "../../actions/zoneAction";
import {
  getAdminDrugCategorys,
} from "../../actions/drugCategoryAction";
import {  getChemicalsByDrugCategory } from "../../actions/chemicalAction";
import { getAdminDiseases } from "../../actions/diseaseAction";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import $ from "jquery";

export default function AddDrug() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    register,
    getValues,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // Zones
  const {
    error: zoneError,
    loading: zoneLoading,
    success: zoneSuccess,
    zones,
  } = useSelector((state) => state.zones);
  // Drugs Categories
  const { error: drugCategoryError, drugCategorys } = useSelector(
    (state) => state.drugCategorys
  );
  // Drugs Category Details
  const {
    loading: drugCategoryDetailsLoading,
    error: drugCategoryDetailsError,
    drugCategory,
  } = useSelector((state) => state.drugCategoryDetails);
  // Chemicals
  const { error: chemicalsError, chemicals } = useSelector(
    (state) => state.chemicals
  );
  // Diseases
  const { error: diseasesError, diseases } = useSelector(
    (state) => state.diseases
  );
  // Create Drug
  const { loading, error, success, drug } = useSelector(
    (state) => state.newDrug
  );
  // Users
  const { employee } = useSelector((state) => state.employee);
  const countries = [
    "India",
    "China",
    "Germany",
    "Belgium",
    "France",
    "Italy",
    "United States",
    "Ireland",
    "Netherlands",
    "United Kingdom",
    "Denmark",
    "Spain",
    "Sweden",
    "Canada",
    "Slovenia",
  ];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (drugCategoryDetailsError) {
      alert.error(drugCategoryDetailsError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Drug Created Successfully");
      dispatch({ type: NEW_DRUG_RESET });
      reset();
    }

    dispatch(getAdminDrugCategorys());
    dispatch(getZones());
    dispatch(getAdminDiseases());
  }, [dispatch, alert, error, success, drugCategoryDetailsError, reset]);

  const handleChangeChemicals = () => {
    const chemicalsData = [
      ...document.querySelectorAll(".chemicalsData input:checked"),
    ].map((e) => e.value);
    var chemicalData = "";
    for (var i = 0; i < chemicalsData.length; i++) {
      if (i === 0) chemicalData = chemicalData + chemicalsData[i];
      else chemicalData = chemicalData + ", " + chemicalsData[i];
    }
    setValue("composition", chemicalData, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleChangeDiseases = () => {
    const diseasesData = [
      ...document.querySelectorAll(".diseasesData input:checked"),
    ].map((e) => e.value);
    var diseaseData = "";
    for (var i = 0; i < diseasesData.length; i++) {
      if (i === 0) diseaseData = diseaseData + diseasesData[i];
      else diseaseData = diseaseData + ", " + diseasesData[i];
    }
    setValue("uses", diseaseData, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = (formData) => {
    const random = (Math.random() + 1).toString(36).substring(7);

    var selectedCategory = $("#categoryDropdown")
      .children("option")
      .filter(":selected")
      .text();
    var newKeywords = `${formData.keywords} ${formData.name} ${selectedCategory}`;
    newKeywords = newKeywords.toLowerCase();
    console.log(selectedCategory);

    var slugUrl = `medicine-${selectedCategory}-${formData.name}-${formData.brand}-${random}`;
    slugUrl = slugUrl
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    slugUrl = slugUrl.replaceAll(/---/g, "-");
    slugUrl = slugUrl.replaceAll(/--/g, "-");

    const drugsForm = new FormData();
    const drugPricesForm = new FormData();

    drugsForm.set("name", formData.name);
    drugsForm.set("category", formData.category);
    drugsForm.set("description", formData.description);
    drugsForm.set("composition", formData.composition);
    drugsForm.set("hot", formData.hot);
    drugsForm.set("trending", formData.trending);
    drugsForm.set("generic", formData.generic);
    drugsForm.set("brand", formData.brand);
    drugsForm.set("countryOfOrigin", formData.countryOfOrigin);
    drugsForm.set("deskImg", formData.deskImg);
    drugsForm.set("mobileImg", formData.mobileImg);
    drugsForm.set("uses", formData.uses);
    drugsForm.set("usesDirections", formData.usesDirections);
    drugsForm.set("commonSideEffects", formData.commonSideEffects);
    drugsForm.set("seriousSideEffects", formData.seriousSideEffects);
    drugsForm.set("warningPrecautions", formData.warningPrecautions);
    drugsForm.set("synopsis", formData.synopsis);
    drugsForm.set("otherDetails", formData.otherDetails);
    drugsForm.set("keywords", newKeywords);
    drugsForm.set("metaTitle", formData.metaTitle);
    drugsForm.set("metaKeywords", formData.metaKeywords);
    drugsForm.set("metaDescription", formData.metaDescription);
    drugsForm.set("slugUrl", slugUrl);
    drugsForm.set("zoneId", employee.zoneId);
    drugsForm.set("user", employee._id);

    const discounts = Math.round(
      ((formData.mrp - formData.price) * 100) / formData.mrp
    );
    drugPricesForm.set("mrp", formData.mrp);
    drugPricesForm.set("price", formData.price);
    // drugPricesForm.set("stocks", stocks);
    drugPricesForm.set("discounts", discounts);
    drugPricesForm.set("hot", formData.hot);
    drugPricesForm.set("trending", formData.trending);

    dispatch(getZones());
    dispatch(createDrug(drugsForm, drugPricesForm, zones));
  };

  return (
    <>
      <MetaData title="Add drugs" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Add drugs" />
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
                      id="drugSubmitForm"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Name *</label>
                              <input
                                {...register("name", {
                                  required: "Product name is required !!",
                                  minLength: {
                                    value: 5,
                                    message:
                                      "Please enter name minimum 5 characters",
                                  },
                                })}
                                className={classNames("form-control", {
                                  "is-invalid": errors.name,
                                })}
                                autoComplete="off"
                                placeholder="Enter drugs name ..."
                                type="text"
                                // defaultValue={name}
                                // onChange={(e) => {
                                //   setName(e.target.value);
                                // }}
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
                              <label>Drugs category</label>
                              <select
                                id="categoryDropdown"
                                {...register("category", {
                                  required: "Product category is required !!",
                                })}
                                className={classNames("form-control", {
                                  "is-invalid": errors.category,
                                })}
                                onChange={(e) =>
                                  dispatch(
                                    getChemicalsByDrugCategory(e.target.value)
                                  )
                                }
                              >
                                <option value="">Select category</option>
                                {drugCategorys.map((drugCategory) => (
                                  <option
                                    key={drugCategory.name}
                                    value={drugCategory._id}
                                  >
                                    {drugCategory.name}
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
                          {/* Address */}
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Brand name</label>
                              <input
                                className="form-control"
                                autoComplete="off"
                                type={"text"}
                                {...register("brand")}
                                placeholder="Enter brand name..."
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Country</label>
                              <select
                                {...register("countryOfOrigin")}
                                className="form-control"
                              >
                                <option value={""}>
                                  Choose country of origin
                                </option>
                                {countries.map((country) => (
                                  <option key={country} value={country}>
                                    {country}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
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
                                placeholder="Enter drugs mrp..."
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
                          <div className="col-sm-12">
                            <div className="form-group">
                              <label>Composition</label>
                              <input
                                autoComplete="off"
                                type="text"
                                {...register("composition")}
                                data-toggle="modal"
                                data-target="#ListModalChemicals"
                                className="form-control"
                                placeholder="Enter composition ..."
                              />
                            </div>

                            <div
                              className="modal fade"
                              id="ListModalChemicals"
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Select Chemicals
                                    </h5>
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body chemicalsData">
                                    <div className="row col-12">
                                      {}

                                      {!drugCategoryDetailsLoading
                                        ? chemicals.map((chemical) => (
                                            <div className="form-check form-check-inline">
                                              <label className="form-check-label">
                                                <input
                                                  className="form-check-input mr-2"
                                                  autoComplete="off"
                                                  type="checkbox"
                                                  {...register("chemicals[]")}
                                                  defaultValue={chemical.name}
                                                />
                                                {chemical.name}
                                              </label>
                                            </div>
                                          ))
                                        : "Please wait chemicals is loading.."}
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="btn btn-primary"
                                      data-dismiss="modal"
                                      onClick={() => {
                                        handleChangeChemicals();
                                      }}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="col-sm-6">
                            <div className="form-group">
                              <label>Stocks</label>
                              <input
                                autoComplete="off" type="number"
                                className="form-control"
                                placeholder="Enter selling price..."
                                min="0"
                                {...register("stocks"
                                id="priceStocks"
                                 // defaultValue={stocks}
                                onChange={(e) =>
                                  setStocks(parseInt(e.target.value))
                                }
                              />
                            </div>
                          </div> */}
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Desktop Image</label>
                              <input
                                autoComplete="off"
                                type="file"
                                className="form-control"
                                {...register("images.deskImg")}
                                // onChange={(e) => setDeskImg(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Mobile Image</label>
                              <input
                                autoComplete="off"
                                type="file"
                                className="form-control"
                                {...register("images.mobileImg")}
                                // onChange={(e) => setMobileImg(e.target.value)}
                              />
                            </div>
                          </div>
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
                                  {...register("generic")}
                                  id="generic"
                                />
                                generic
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
                                <label>Uses</label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  data-toggle="modal"
                                  data-target="#ListModalDiseases"
                                  className="form-control"
                                  {...register("uses")}
                                  placeholder="Enter uses ..."
                                />
                              </div>
                            </div>
                            <div
                              className="modal fade"
                              id="ListModalDiseases"
                              tabIndex={-1}
                              role="dialog"
                              aria-labelledby="exampleModalCenterTitle"
                              aria-hidden="true"
                            >
                              <div
                                className="modal-dialog modal-dialog-centered"
                                role="document"
                              >
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <h5
                                      className="modal-title"
                                      id="exampleModalLongTitle"
                                    >
                                      Select Diseases
                                    </h5>
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="close"
                                      data-dismiss="modal"
                                      aria-label="Close"
                                    >
                                      <span aria-hidden="true">×</span>
                                    </button>
                                  </div>
                                  <div className="modal-body diseasesData">
                                    <div className="row col-12">
                                      {diseases.map((disease) => (
                                        <div className="form-check form-check-inline">
                                          <label className="form-check-label">
                                            <input
                                              className="form-check-input mr-2"
                                              autoComplete="off"
                                              type="checkbox"
                                              {...register("diseases[]")}
                                              defaultValue={disease.name}
                                            />
                                            {disease.name}
                                          </label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="btn btn-secondary"
                                      data-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                    <button
                                      autoComplete="off"
                                      type="button"
                                      className="btn btn-primary"
                                      data-dismiss="modal"
                                      onClick={() => {
                                        handleChangeDiseases();
                                      }}
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Uses Directions</label>
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder="Enter uses Directions..."
                                  {...register("usesDirections")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Common side effeects</label>
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder="Enter uses ..."
                                  {...register("commonSideEffects")}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Serious side effects</label>
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder="Enter uses ..."
                                  {...register("seriousSideEffects")}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Warning precautions</label>
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder="Enter warning precautions"
                                  {...register("warningPrecautions")}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Synosis</label>
                                <textarea
                                  rows={3}
                                  className="form-control"
                                  placeholder="Enter synopsis ..."
                                  {...register("synopsis")}
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
                                  className="form-control"
                                  placeholder="Enter other details.."
                                  {...register("otherDetails")}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card card-success">
                        <div className="card-header">
                          <h3 className="card-title">Product SEO</h3>
                        </div>
                        <div className="card-body">
                          <div className="row">
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Meta title</label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter meta title ..."
                                  {...register("metaTitle")}
                                />
                              </div>
                            </div>
                            <div className="col-sm-6">
                              <div className="form-group">
                                <label>Meta Keywords</label>
                                <input
                                  autoComplete="off"
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter meta keywords ..."
                                  {...register("metaKeywords")}
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
                                  placeholder="Enter meta descriptions ..."
                                  {...register("metaDescription")}
                                />
                              </div>
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
