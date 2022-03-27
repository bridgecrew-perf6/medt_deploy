import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getChemicals,
  clearErrors,
  createChemical,
} from "../../actions/chemicalAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_CHEMICAL_RESET } from "../../constants/chemicalConstants";
import ContentHeader from "../../components/ContentHeader";
import Loader from "../../components/loader/Loader";

function WebSetting() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newChemical);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("WebSetting added successfully");
      dispatch({ type: NEW_CHEMICAL_RESET });
      dispatch({ type: getChemicals });
      dispatch({ type: createChemical });
    }
  }, [dispatch, error, alert, success]);

  const createChemicalSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createChemical(name, description));
  };
  return (
    <>
      <MetaData title="WebSetting" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="WebSetting" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding WebSetting */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Web settings</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createChemicalSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Web Marque</label>
                            <input
                              type="text"
                              className="form-control"
                              value={
                                "Get Flat 3% discount on orders above 2000/-; Flat Rs.30 discount on orders above Rs.1000/-; Get 1kg Onion and 1kg Potato at Rs.20 on purchase of Rs.1000/-; FREE 1kg Potato on orders above Rs.500/-; Get 1kg Onion at Rs.15 on orders above Rs.750/-; SELECT COUPAN AT CHECKOUT PAGE, Get 1kg Sugar @Rs.21 on orders above Rs.750/-; Get Aashirvaad atta 5kg @160 on orders above Rs.500/-  SELECT COUPAN AT CHECKOUT PAGE"
                              }
                              placeholder="Enter web marque..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>App Marque</label>
                            <input
                              type={"text"}
                              value={
                                "Get Flat 3% discount on orders above 2000/-; Flat Rs.30 discount on orders above Rs.1000/-; Get 1kg Onion and 1kg Potato at Rs.20 on purchase of Rs.1000/-; FREE 1kg Potato on orders above Rs.500/-; Get 1kg Onion at Rs.15 on orders above Rs.750/-; SELECT COUPAN AT CHECKOUT PAGE, Get 1kg Sugar @Rs.21 on orders above Rs.750/-; Get Aashirvaad atta 5kg @160 on orders above Rs.500/-  SELECT COUPAN AT CHECKOUT PAGE"
                              }
                              placeholder="Enter app marque..."
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>App Otp</label>
                            <input
                              type={"text"}
                              placeholder="Enter app otp..."
                              value={"1732"}
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Web Otp</label>
                            <input
                              type={"text"}
                              value={"1732"}
                              placeholder="Enter web otp..."
                              className="form-control"
                              defaultValue={""}
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
                        Submit
                      </button>
                    </div>
                  </form>
                  {/* /.card-body */}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default WebSetting;
