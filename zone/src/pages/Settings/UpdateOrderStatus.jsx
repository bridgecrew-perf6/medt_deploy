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

function UpdateOrderStatus() {
  const paymentStatus = [
    "Unpaid",
    "Failed",
    "Success",
    "Pending",
    "Partial Payment",
  ];
  const paymentMode = [
    "Cash on Delivery",
    "PayU Money",
    "RazorPay",
    "RazorPay Link",
    "Google Pay",
    "Phonepe",
    "Paytm",
    "Payment Link",
    "Other Wallet",
    "Other payment mode",
  ];

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
      alert.success("UpdateOrderStatus added successfully");
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
      <MetaData title="UpdateOrderStatus" />
      {loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="UpdateOrderStatus" />
          <section className="content">
            <div className="container-fluid">
              {/* Adding UpdateOrderStatus */}
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Payment status update</h3>
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
                              placeholder="Enter order id ..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Status</label>
                            <select className="form-control">
                              <option value="">Choose status</option>
                              {paymentStatus.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>PaymentMode</label>
                            <select className="form-control">
                              <option value="">Choose payment mode</option>
                              {paymentMode.map((mode) => (
                                <option key={mode} value={mode}>
                                  {mode}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>PaymentStatus</label>
                            <select className="form-control">
                              <option value="">Choose payment status</option>
                              {paymentStatus.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Total</label>
                            <input
                              type={"text"}
                              className="form-control"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Net payable</label>
                            <input
                              type={"text"}
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
                        Update
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

export default UpdateOrderStatus;
