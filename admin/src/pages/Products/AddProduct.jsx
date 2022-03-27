import React, { useEffect, useState } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../../components/loader/Loader";
import { getAdminProductCategorys } from "../../actions/productCategoryAction";
import { getZones } from "../../actions/zoneAction";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import $ from "jquery";
import axios from "axios";
import "./AddProduct.css";

export default function AddProduct() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    register,
    getValues,
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
  const { user } = useSelector((state) => state.user);
  const { loading, error, success, product } = useSelector(
    (state) => state.newProduct
  );

  const [deskImg, setDeskImg] = useState({});
  const [deskImgPreview, setDeskImgPreview] = useState([]);
  const [mobileImgPreview, setMobileImgPreview] = useState([]);
  const [sliderImagesPreview, setSliderImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Product Created Successfully");
      dispatch({ type: NEW_PRODUCT_RESET });
      reset();
    }

    if (productCategoryError) {
      alert.error(productCategoryError);
      dispatch(clearErrors());
    }

    dispatch(getAdminProductCategorys());
    dispatch(getZones());
  }, [dispatch, alert, error, productCategoryError, reset, deskImg, success]);

  const previewDeskImg = (e) => {
    const files = Array.from(e.target.files);
    setDeskImg({});
    setDeskImg(e.target.files[0]);
    console.log(deskImg);
    setDeskImgPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setDeskImgPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const previewMobileImg = (e) => {
    const files = Array.from(e.target.files);
    setMobileImgPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setMobileImgPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const previewSliderImages = (e) => {
    const files = Array.from(e.target.files);
    setSliderImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setSliderImagesPreview((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = async (formData) => {
    const random = (Math.random() + 1).toString(36).substring(7);

    var selectedCategory = $("#categoryDropdown")
      .children("option")
      .filter(":selected")
      .text();
    var newKeywords = `${formData.keywords} ${formData.name} ${selectedCategory}`;
    newKeywords = newKeywords.toLowerCase();
    var slugUrl = `medicine-${selectedCategory}-${formData.name}-${formData.brand}-${random}`;
    slugUrl = slugUrl
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    slugUrl = slugUrl.replaceAll(/---/g, "-");
    slugUrl = slugUrl.replaceAll(/--/g, "-");

    const productsForm = new FormData();
    const productPricesForm = new FormData();
    const imgData = new FormData();

    const files = Array.from(formData.deskImg);
    // const deskImgLinks = {};
    var deskImgLink = {};
    imgData.set("upload_preset", "zmve4j7j");

    imgData.set("folder", "products/desktop");
    imgData.set("file", deskImg);
    await axios
      .post("https://api.cloudinary.com/v1_1/dd2bjmajs/image/upload", imgData)
      .then((res) => {
        console.log(res);
        deskImgLink = {
          public_id: res.data.public_id,
          url: res.data.secure_url,
        };


        // productsForm.append("deskImg", deskImgLink);
        productsForm.append("deskImg","public_id", res.data.public_id);
        productsForm.append("deskImg","url", res.data.secure_url);

        console.log(deskImgLink);
      });
    // imgData.set("folder", "products/desktop");
    // for (let i = 0; i < files.length; i++) {
    //   imgData.set("file", deskImg);
    //   await axios
    //     .post("https://api.cloudinary.com/v1_1/dd2bjmajs/image/upload", imgData)
    //     .then((res) => {
    //       console.log(res);
    //       deskImgLinks.push({
    //         public_id: res.data.public_id,
    //         url: res.data.secure_url,
    //       });
    //       console.log(deskImgLinks);
    //     });
    // }

    productsForm.set("name", formData.name);
    productsForm.set("category", formData.category);
    productsForm.set("description", formData.description);
    productsForm.set("keywords", newKeywords);
    productsForm.set("packSize", formData.packSize);
    productsForm.set("hot", formData.hot);
    productsForm.set("trending", formData.trending);
    productsForm.set("brand", formData.brand);

    // productsForm.append("deskImg", deskImg);
    // productsForm.set("mobileImg", formData.mobileImg);
    productsForm.set("ingredients", formData.ingredients);
    productsForm.set("productInfo", formData.productInfo);
    productsForm.set("otherDetails", formData.otherDetails);
    productsForm.set("metaTitle", formData.metaTitle);
    productsForm.set("metaKeywords", formData.metaKeywords);
    productsForm.set("metaDescription", formData.metaDescription);
    productsForm.set("slugUrl", slugUrl);
    productsForm.set("zoneId", user._id);
    productsForm.set("user", user._id);

    const discounts = Math.round(
      ((formData.mrp - formData.price) * 100) / formData.mrp
    );

    productPricesForm.set("mrp", formData.mrp);
    productPricesForm.set("price", formData.price);
    // productPricesForm.set("stocks", formData.stocks);
    productPricesForm.set("discounts", discounts);
    productPricesForm.set("hot", formData.hot);
    productPricesForm.set("trending", formData.trending);

    dispatch(getZones());
    dispatch(createProduct(productsForm, productPricesForm, zones));
  };

  return (
    <>
      <MetaData title="Add product" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Add product" />
          <section className="content">
            <div className="container-fluid">
              <div classname="row">
                <div className="card card-success">
                  <div className="card-header">
                    <h3 className="card-title">General details</h3>
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
                                  // key={productCategory.name}
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
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>MRP</label>
                            <input
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
                              min="0"
                              placeholder="Enter products mrp..."
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
                              type="number"
                              {...register("price", {
                                required: "Price is required !!",
                                min: {
                                  value: 0,
                                  message: "Please enter price greater than 0",
                                },
                                validate: (value) =>
                                  parseFloat(value) <=
                                    parseFloat(getValues("mrp")) ||
                                  " Price should be less than or equal to mrp !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.price,
                              })}
                              min="0"
                              placeholder="Enter selling price..."
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
                              {...register("deskImg", {
                                required: "Please select atleast one image !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.category,
                              })}
                              id="deskImg"
                              accept="image/*"
                              onChange={previewDeskImg}
                            />
                            {errors.deskImg && (
                              <div className="invalid-feedback">
                                {errors.deskImg.message}
                              </div>
                            )}
                            <div id="" className="previewImage">
                              {deskImgPreview.map((image, index) => (
                                <img
                                  width={"150px"}
                                  key={index}
                                  src={image}
                                  alt="Product Preview"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Mobile Image</label>
                            <input
                              type="file"
                              {...register("mobileImg", {
                                required: "Please select atleast one image !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.category,
                              })}
                              id="mobileImg"
                              accept="image/*"
                              onChange={previewMobileImg}
                            />
                            {errors.mobileImg && (
                              <div className="invalid-feedback">
                                {errors.mobileImg.message}
                              </div>
                            )}
                            <div id="" className="previewImage">
                              {mobileImgPreview.map((image, index) => (
                                <img
                                  width={"150px"}
                                  key={index}
                                  src={image}
                                  alt="Product Preview"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Slider Image</label>
                            <input
                              type="file"
                              className="form-control"
                              {...register("sliderImages")}
                              id="sliderImages"
                              multiple
                              onChange={previewSliderImages}
                            />
                            <div id="" className="previewImage">
                              {sliderImagesPreview.map((image, index) => (
                                <img
                                  width={"150px"}
                                  key={index}
                                  src={image}
                                  alt="Product Preview"
                                />
                              ))}
                            </div>
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
                        Submit
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
