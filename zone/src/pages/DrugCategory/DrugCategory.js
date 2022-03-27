import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getAdminDrugCategorys,
  clearErrors,
  createDrugCategory,
} from "../../actions/drugCategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_DRUGCATEGORY_RESET } from "../../constants/drugCategoryConstants";
import ContentHeader from "../../components/ContentHeader";
import DrugCategoryList from "./DrugCategoryList";
import Loader from "../../components/loader/Loader";

function DrugCategory() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.newDrugCategory
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("DrugCategory added successfully");
      dispatch({ type: NEW_DRUGCATEGORY_RESET });
    }
    // dispatch({ type: getAdminDrugCategorys });
  }, [dispatch, error, alert, success]);

  const createDrugCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createDrugCategory(name, description));
  };
  return (
    <>
      <MetaData title="Drug Category" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Drug Category" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding DrugCategory */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add drug category</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createDrugCategorySubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Drug category name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter drug category name ..."
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

              {/* DrugCategory Table */}
              {loading ? <Loader /> : <DrugCategoryList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default DrugCategory;
