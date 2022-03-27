import React, { useEffect, } from "react";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateEmployee } from "../../actions/employeeAction";
import { useAlert } from "react-alert";
import { UPDATE_EMPLOYEE_RESET } from "../../constants/employeeConstants";
import Loader from "../../components/loader/Loader";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { getAdminZones } from "../../actions/zoneAction";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeDetails } from "../../actions/employeeAction";

export default function AddEmployee() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ids = ["Aadhar Card", "Pan Card", "Driving License", "Voter Id"];
  const { user } = useSelector((state) => state.user);
  const { zones } = useSelector((state) => state.zones);
  const { loading, error, isUpdated } = useSelector((state) => state.employeeAdmin);
  const {
    loading: employeeDetailsLoading,
    error: employeeDetailsError,
    employee,
  } = useSelector((state) => state.employeeDetails);

  const employeeId = params.id;
  useEffect(() => {
    if (employee && employee._id !== employeeId) {
      dispatch(getEmployeeDetails(employeeId));
    } else {
      var employeeData = employee;
      reset(employeeData);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Employee Updated Successfully");
      reset();
      dispatch({ type: UPDATE_EMPLOYEE_RESET });
      reset(employeeData = "");
      navigate("/employee");
    }
    dispatch(getAdminZones());
  }, [dispatch, alert, error, isUpdated, navigate, employee, employeeId, reset]);

  const onSubmit = (formData) => {
    // const employeeForm = new FormData();
    // console.log(typeof formData);
    // employeeForm(...formData);

    console.log(formData);
    // dispatch(updateEmployee(employeeId, formData));
  };

  return (
    <>
      <MetaData title="Update Employee" />
      {employeeDetailsLoading || loading ? (
        <Loader />
      ) : (
        <div className="content-wrapper">
          <ContentHeader title="Update Employee" />
          <section className="content">
            <div className="container-fluid">
              <div classname="row">
                <div className="card card-light">
                  <div className="card-header">
                    <h3 className="card-title">Fill the Employee details</h3>
                  </div>
                  {/* /.card-header */}
                  <form
                    autocomplete="off"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-6">
                          {/* Name */}
                          <div className="form-group">
                            <label>Name *</label>
                            <input
                              type="text"
                              {...register("name", {
                                required: "Employee name is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.name,
                              })}
                              placeholder="Enter employee name ..."
                            />
                            {errors.name && (
                              <div className="invalid-feedback">
                                {errors.name.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Email */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Email *</label>
                            <input
                              type="email"
                              {...register("email", {
                                required: "Email is required !!",
                                pattern: {
                                  value:
                                    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: "Enter valid email address",
                                },
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.email,
                              })}
                              placeholder="Enter email address ..."
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* Phone Number */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Phone number *</label>
                            <input
                              type="tel"
                              {...register("phone", {
                                required: "Phone number is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.phone,
                              })}
                              placeholder="Enter phone number ..."
                            />
                            {errors.phone && (
                              <div className="invalid-feedback">
                                {errors.phone.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Alternate Phone Number */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Alternate phone number</label>
                            <input
                              type="tel"
                              className="form-control"
                              {...register("altPhone")}
                              placeholder="Enter alternate phone number ..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* Address */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Address *</label>
                            <textarea
                              {...register("address", {
                                required: "Address is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.address,
                              })}
                              rows={3}
                              placeholder="Enter address..."
                            />
                            {errors.address && (
                              <div className="invalid-feedback">
                                {errors.address.message}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Zone *</label>
                            <select
                              {...register("zoneId", {
                                required: "Zone is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.zoneId,
                              })}
                            >
                              <option value={user._id} key="admin">
                                Admin
                              </option>
                              {zones.map((zone) => (
                                <option
                                  selected={
                                    zone._id === employee.zoneId
                                      ? "selected"
                                      : ""
                                  }
                                  key={zone.name}
                                  value={zone._id}
                                >
                                  {zone.name}
                                </option>
                              ))}
                            </select>
                            {errors.zoneId && (
                              <div className="invalid-feedback">
                                {errors.zoneId.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        {/* Address Proof */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Address Proof *</label>
                            <select
                              {...register("addressProof", {
                                required: "Address proof is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.addressProof,
                              })}
                            >
                              <option value="">Choose address proof</option>
                              {ids.map((id) => (
                                <option key={id} value={id}>
                                  {id}
                                </option>
                              ))}
                            </select>
                            {errors.addressProof && (
                              <div className="invalid-feedback">
                                {errors.addressProof.message}
                              </div>
                            )}
                          </div>
                        </div>
                        {/* Address proof id */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <label>Address proof id *</label>
                            <input
                              type="text"
                              {...register("addressProofId", {
                                required: "Address proof id is required !!",
                              })}
                              className={classNames("form-control", {
                                "is-invalid": errors.addressProofId,
                              })}
                              placeholder="Enter address proof id ..."
                            />
                            {errors.addressProofId && (
                              <div className="invalid-feedback">
                                {errors.addressProofId.message}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">{/* Zone */}</div>
                      <div className="row">
                        {/* checkbox */}
                        <div className="col-sm-6">
                          <div className="form-group">
                            <div className="form-check">
                              <input
                                type="checkbox"
                                {...register("roles.zoneManager")}
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Zone Manager
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                {...register("roles.storeManager")}
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Store Manager
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                {...register("roles.delivery")}
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Delivery
                              </label>
                            </div>
                            <div className="form-check">
                              <input
                                type="checkbox"
                                {...register("roles.dataEntry")}
                                className="form-check-input"
                              />
                              <label className="form-check-label">
                                Data Entry
                              </label>
                            </div>
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
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
