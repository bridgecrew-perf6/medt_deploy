import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { getZones, clearErrors, createZone } from "../../actions/zoneAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_ZONE_RESET } from "../../constants/zoneConstants";
import ContentHeader from "../../components/ContentHeader";
import ZoneList from "./ZoneList";
import Loader from "../../components/loader/Loader";

function Zone() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newZone);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Zone added successfully");
      dispatch({ type: NEW_ZONE_RESET });
      dispatch({ type: getZones });
      dispatch({ type: createZone });
    }
  }, [dispatch, error, alert, success]);

  const createZoneSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createZone(name, description));
  };
  return (
    <>
      <MetaData title="Zone" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="zone" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding Zone */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add zone</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createZoneSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Zone Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Zone name ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Zone Description</label>
                            <textarea
                              className="form-control"
                              rows={1}
                              placeholder="Enter Zone description..."
                              defaultValue={""}
                              onChange={(e) => setDescription(e.target.value)}
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

              {/* Zone Table */}
              {loading ? <Loader /> : <ZoneList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Zone;
