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

function EditOrder() {
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
      alert.success("EditOrder added successfully");
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
      <MetaData title="EditOrder" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="EditOrder" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding EditOrder */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Edit order</h3>
                  </div>
                  {/* /.card-header */}

                  <div className="card-body">
                    <form onSubmit={createChemicalSubmitHandler}>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Order Id:
                        </label>
                        <div className="col-sm-7">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Enter order id..."
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                        <div className="col-sm-3">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading ? true : false}
                          >
                            Search
                          </button>
                        </div>
                      </div>
                    </form>
                    <form>
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-sm-3 col-form-label">
                              Order Id
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter mobile number ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label className="col-sm-3 col-form-label">
                              Order Id
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter mobile number ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading ? true : false}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

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

export default EditOrder;
