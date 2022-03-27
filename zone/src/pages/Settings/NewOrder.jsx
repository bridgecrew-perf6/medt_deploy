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

function NewOrder() {

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
      alert.success("NewOrder added successfully");
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
      <MetaData title="NewOrder" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="NewOrder" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding NewOrder */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">New Order</h3>
                  </div>
                  {/* /.card-header */}
                  <form onSubmit={createChemicalSubmitHandler}>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Order Id</label>
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
                            <label>Client's Name</label>
                            <input
                              type={"text"}
                              placeholder="Enter client,s name ..."
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Client's Email</label>
                            <input
                              type={"email"}
                              placeholder="Enter client,s email..."
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

export default NewOrder;
