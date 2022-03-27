import React, { useEffect, useState } from "react";
import MetaData from "../../layout/MetaData";
import { getChemicals, clearErrors, createChemical } from "../../actions/chemicalAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { NEW_CHEMICAL_RESET } from "../../constants/chemicalConstants";
import ContentHeader from "../../components/ContentHeader";
import ChemicalList from "./ChemicalList";
import Loader from "../../components/loader/Loader";

function Chemical() {
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
      alert.success("Chemical added successfully");
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
                  <form onSubmit={createChemicalSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Chemical Name *</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Chemical name ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
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

              {/* Chemical Table */}
              {loading ? <Loader/> : <ChemicalList />}
            </div>
          </section>
        </div>
      )}
    </>
  );
}

export default Chemical;
