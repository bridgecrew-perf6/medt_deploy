import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import {
  UPDATE_PRODUCT_RESET,
  UPDATE_PRODUCT_SUCCESS,
} from "../../constants/productConstants";
import Loader from "../../components/loader/Loader";
import { getAdminProductCategorys, getProductCategorys } from "../../actions/productCategoryAction";
import { getZones } from "../../actions/zoneAction";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import $ from "jquery";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
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
  const { error: productCategoryError, productCategorys } = useSelector(
    (state) => state.productCategorys
  );
  const { employee } = useSelector((state) => state.employee);
  // const productCategorys = [
  //   { name: "India" },
  //   { name: "China" },
  //   { name: "America" },
  //   { name: "India" },
  //   { name: "Russia" },
  // ];

  const { loading, error, isUpdated } = useSelector((state) => state.product);
  const {
    loading: productDetailsLoading,
    error: productDetailsError,
    product,
  } = useSelector((state) => state.productDetails);

  const productId = params.id;
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      var productData = product;
      reset(productData);
    }

    if (productDetailsError) {
      alert.error(productDetailsError);
      dispatch(clearErrors());
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      dispatch({ type: UPDATE_PRODUCT_RESET });
      reset();
      reset((productData = ""));
      navigate("/products");
    }

    // if (productCategoryError) {
    //   alert.error(productCategoryError);
    //   dispatch(clearErrors());
    // }

    dispatch(getAdminProductCategorys());

    dispatch(getZones());
  }, [dispatch, alert, error, navigate, isUpdated, product, productId, productDetailsError, reset]);

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

    const productsForm = new FormData();

    productsForm.set("name", formData.name);
    productsForm.set("category", formData.category);
    productsForm.set("description", formData.description);
    productsForm.set("keywords", newKeywords);
    productsForm.set("packSize", formData.packSize);
    productsForm.set("hot", formData.hot);
    productsForm.set("trending", formData.trending);
    productsForm.set("brand", formData.brand);
    productsForm.set("desktopImg", formData.desktopImg);
    productsForm.set("mobileImg", formData.mobileImg);
    productsForm.set("specifications", formData.specifications);
    productsForm.set("productInfo", formData.productInfo);
    productsForm.set("otherDetails", formData.otherDetails);
    productsForm.set("metaTitle", formData.metaTitle);
    productsForm.set("metaKeywords", formData.metaKeywords);
    productsForm.set("metaDescription", formData.metaDescription);
    productsForm.set("slugUrl", slugUrl);

    dispatch(updateProduct(productId, productsForm));
  };

  return (
    <>
      <MetaData title="Add products" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Add products" />
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
                              placeholder="Enter products name ..."
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
                            <label>Products category</label>
                            <select
                              {...register("category", {
                                required: "Product category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.category,
                              })}
                              id="categoryDropdown"
                            >
                              <option value="">Select category</option>
                              {productCategorys.map((productCategory) => (
                                <option
                                  selected={
                                    productCategory._id === product.category
                                      ? "selected"
                                      : ""
                                  }
                                  key={productCategory.name}
                                  value={productCategory._id}
                                >
                                  {productCategory.name}
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
                              <label>Ingredients</label>
                              <textarea
                                rows={3}
                                {...register("ingredients")}
                                className="form-control"
                                placeholder="Enter ingredients ..."
                              />
                            </div>
                          </div>
                          <div className="col-sm-6">
                            <div className="form-group">
                              <label>Product Information</label>
                              <textarea
                                rows={3}
                                className="form-control"
                                {...register("productInfo")}
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
                        <h3 className="card-title">Product SEO</h3>
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
