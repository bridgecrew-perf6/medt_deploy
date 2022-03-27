import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { clearErrors, createChemical } from "../../actions/chemicalAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_CHEMICAL_RESET } from "../../constants/chemicalConstants";
import ContentHeader from "../../components/ContentHeader";
import ChemicalList from "./ChemicalList";
import Loader from "../../components/loader/Loader";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { getAdminDrugCategorys } from "../../actions/drugCategoryAction";

function Chemical() {
  const alert = useAlert();
  const dispatch = useDispatch();
 const {
   register,
   getValues,
   reset,
   handleSubmit,
   formState: { errors },
  } = useForm();

  const { error: drugCategoryError, drugCategorys } = useSelector(
    (state) => state.drugCategorys
  );
  const { loading, error, success } = useSelector((state) => state.newChemical);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Chemical added successfully");
      reset();
      dispatch({ type: NEW_CHEMICAL_RESET });
    }

    dispatch(getAdminDrugCategorys());

  }, [dispatch, error, alert, success]);

  const onSubmit = (formData) => {
    dispatch(createChemical(formData));
  }
  return (
    <>
      <MetaData title="Chemical" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="chemical" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding Chemical */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add chemical</h3>
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
                            <label>Chemical Name *</label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Drug name is required !!",
                                minLength: {
                                  value: 5,
                                  message:
                                    "Please enter name minimum 5 characters",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.name,
                              })}
                              placeholder="Enter Chemical name ..."
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
                              {...register("drugCategory", {
                                required: "Drug category is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.drugCategory,
                              })}
                              id="categoryDropdown"
                            >
                              <option value="">Select drugs category</option>
                              {drugCategorys.map((drugCategory) => (
                                <option
                                  key={drugCategory.name}
                                  value={drugCategory._id}
                                >
                                  {drugCategory.name}
                                </option>
                              ))}
                            </select>
                            {errors.drugCategory && (
                              <div className="invalid-feedback">
                                {errors.drugCategory.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Chemical Description</label>
                            <textarea
                              className="form-control"
                              rows={1}
                              placeholder="Enter Chemical description..."
                              defaultValue={""}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                        </div> */}
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
              {loading ? <Loader /> : <ChemicalList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Chemical;
