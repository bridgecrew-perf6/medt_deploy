import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  clearErrors,
  createProductCategory,
} from "../../actions/productCategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_PRODUCT_CATEGORY_RESET } from "../../constants/productCategoryConstants";
import ContentHeader from "../../components/ContentHeader";
import ProductCategoryList from "./ProductCategoryList";
import Loader from "../../components/loader/Loader";

function ProductCategory() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.newProductCategory
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("ProductCategory added successfully");
      dispatch({ type: NEW_PRODUCT_CATEGORY_RESET });
    }
    // dispatch({ type: getAdminProductCategorys });
  }, [dispatch, error, alert, success]);

  const createProductCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createProductCategory(name, description));
  };
  return (
    <>
      <MetaData title="Product Category" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Product Category" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding ProductCategory */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add product category</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createProductCategorySubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Product category name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter product category name ..."
                              onChange={(e) => setName(e.target.value)}
                            />
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

              {/* ProductCategory Table */}
              {loading ? <Loader /> : <ProductCategoryList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default ProductCategory;
