import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { IconButton, Link } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_EMPLOYEE_RESET } from "../../constants/employeeConstants";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import {
  getAllEmployees,
  clearErrors,
  deleteEmployee,
} from "../../actions/employeeAction";
import Loader from "./../../components/loader/Loader";
import { useNavigate } from "react-router-dom";

export default function Employee() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, employees } = useSelector(
    (state) => state.allEmployees
  );
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.employeeAdmin
  );

  const deleteEmployeeHandler = (id) => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Employee Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_EMPLOYEE_RESET });
    }
    dispatch(getAllEmployees());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  // Data Grid

  const columns = [
    { field: "serial", headerName: "#", minWidth: 50, flex: 0.2 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "phone",
      headerName: "Phone",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "altPhone",
      headerName: "Alt Phone",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "address",
      headerName: "Address",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "addressProof",
      headerName: "Address Proof",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "addressProofId",
      headerName: "Proof Id",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/employee/${params.getValue(params.id, "id")}`}>
              <IconButton
                color="primary"
                onClick={() =>
                  navigate(`/employee/${params.getValue(params.id, "id")}`)
                }
              >
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              color="secondary"
              onClick={() =>
                deleteEmployeeHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  employees &&
    employees.forEach((employee) => {
      rows.push({
        serial: count++,
        id: employee._id,
        name: employee.name,
        phone: employee.phone,
        altPhone: employee.altPhone,
        email: employee.email,
        address: employee.address,
        addressProof: employee.addressProof,
        addressProofId: employee.addressProofId,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Employee" />
          <div className="content-wrapper">
            <ContentHeader title="Employee" />
            <section className="content">
              <div className="container-fluid">
                <div classname="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Employee Details</h3>
                      </div>
                      <div className="card-body">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="employeeListTable"
                          autoHeight
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </Fragment>
  );
  // );
}
