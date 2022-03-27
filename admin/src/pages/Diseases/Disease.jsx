import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import {
  getDiseases,
  clearErrors,
  createDisease,
} from "../../actions/diseaseAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_DISEASE_RESET } from "../../constants/diseaseConstants";
import ContentHeader from "../../components/ContentHeader";
import DiseaseList from "./DiseaseList";
import Loader from "../../components/loader/Loader";

const Disease = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.newDisease);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Disease added successfully");
      dispatch({ type: NEW_DISEASE_RESET });
      dispatch({ type: getDiseases });
      dispatch({ type: createDisease });
    }
  }, [dispatch, error, alert, success]);

  const createDiseaseSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("description", description);

    dispatch(createDisease(name, description));
  };
  return (
    <>
      <MetaData title="Diseases" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="diseases" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding Disease */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Add disease</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createDiseaseSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Disease Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Disease name ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        {/* <div className="col-sm-6">
                          <div className="form-group">
                            <label>Disease Description</label>
                            <textarea
                              className="form-control"
                              rows={1}
                              placeholder="Enter Disease description..."
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

              {/* Disease Table */}
              {loading ? <Loader /> : <DiseaseList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Disease;
