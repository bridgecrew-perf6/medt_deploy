import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getAdminDeviceCategorys,
  clearErrors,
  createDeviceCategory,
} from "../../actions/deviceCategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_DEVICE_CATEGORY_RESET, } from "../../constants/deviceCategoryConstants";
import ContentHeader from "../../components/ContentHeader";
import DeviceCategoryList from "./DeviceCategoryList";
import Loader from "../../components/loader/Loader";

function DeviceCategory() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector(
    (state) => state.newDeviceCategory
  );

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("DeviceCategory added successfully");
      dispatch({ type: NEW_DEVICE_CATEGORY_RESET });
    }
    // dispatch({ type: getAdminDeviceCategorys });
  }, [dispatch, error, alert, success]);

  const createDeviceCategorySubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createDeviceCategory(name, description));
  };
  return (
    <>
      <MetaData title="Device Category" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Device Category" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding DeviceCategory */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add device category</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createDeviceCategorySubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Device category name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter device category name ..."
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

              {/* DeviceCategory Table */}
              {loading ? <Loader /> : <DeviceCategoryList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default DeviceCategory;
