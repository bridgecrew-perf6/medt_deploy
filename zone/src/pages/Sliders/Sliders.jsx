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
import SliderList from "./SliderList";
import Loader from "../../components/loader/Loader";

function Slider() {
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
      alert.success("Slider added successfully");
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
      <MetaData title="Slider" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Slider" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding Slider */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add Slider</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createChemicalSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="form-group">
                            <label>Slider Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Slider name ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Desktop Image</label>
                            <input
                              type={"file"}
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Mobile Image</label>
                            <input
                              type={"file"}
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
                        Add
                      </button>
                    </div>
                  </form>
                  {/* /.card-body */}
                </div>
              </div>

              {/* Slider Table */}
              {loading ? <Loader /> : <SliderList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Slider;
