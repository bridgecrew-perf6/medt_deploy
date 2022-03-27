import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getAdminZones,
  clearErrors,
  createZone,
} from "../../actions/zoneAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_ZONE_RESET } from "../../constants/zoneConstants";
import ContentHeader from "../../components/ContentHeader";
import ZoneList from "./ZoneList";
import Loader from "../../components/loader/Loader";
import { getAdminDrugs, getAllDrugs } from "../../actions/drugAction";
import {
  createDrugPrice,
  getDrugPriceDetailsByZoneId,
} from "../../actions/drugPriceAction";
import { getAdminProducts } from "../../actions/productAction";
import { getAdminDevices } from "../../actions/deviceAction";
import axios from "axios";

function Zone() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { zones } = useSelector((state) => state.zones);
  const { loading, error, success, zone } = useSelector(
    (state) => state.newZone
  );
  const { drugs } = useSelector((state) => state.drugs);
  const { products } = useSelector((state) => state.products);
  const { devices } = useSelector((state) => state.devices);

  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Zone added successfully");
      dispatch({ type: NEW_ZONE_RESET });
    }

    dispatch(getAdminZones());
    dispatch(getAdminDrugs());
    dispatch(getAdminProducts());
    dispatch(getAdminDevices());
  }, [dispatch, error, alert, success]);

  const createZoneSubmitHandler = (e) => {
    e.preventDefault();


    // console.log(drugPricesForm);
          // drugPricesForm = { ...drugPricesForm, drugId, zoneId };

    dispatch(createZone(name, drugs, products, devices, zones[0]._id));
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
