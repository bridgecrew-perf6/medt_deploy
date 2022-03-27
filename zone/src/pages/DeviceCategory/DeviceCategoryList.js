import React, { Fragment, useEffect, useState } from "react";
import {
  getAdminDeviceCategorys,
  clearErrors,
  deleteDeviceCategory,
} from "../../actions/deviceCategoryAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { FormControlLabel, IconButton, Link, Switch } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_DEVICE_CATEGORY_RESET,  } from "../../constants/deviceCategoryConstants";
import Loader from "../../components/loader/Loader";

const DeviceCategoryList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, deviceCategorys } = useSelector((state) => state.deviceCategorys);
  const {
    error: deleteError,
    isDeleted,
    loading,
  } = useSelector((state) => state.deviceCategory);

  const [invisible, setInvisible] = useState(false);

  const deleteDeviceCategoryHandler = (id) => {
    dispatch(deleteDeviceCategory(id));
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
      alert.success("DeviceCategory Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_DEVICE_CATEGORY_RESET });
    }

    dispatch(getAdminDeviceCategorys());
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  const columns = [
    { field: "serial", headerName: "#", minWidth: 200, flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 200,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        const handleStatus = () => {
          setInvisible(!invisible);
        };
        // let invisible = params.getValue(params.status, "status");
        // const handleStatus = () => {
        //   invisible ? (invisible = false) : (invisible = true);
        // };
        return (
          <Fragment>
            <FormControlLabel
              // sx={{ color: "text.secondary" }}
              control={
                <Switch
                  color="primary"
                  checked={!invisible}
                  onChange={handleStatus}
                />
              }
            />
          </Fragment>
        );
      },
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
          <Fragment>
            <Link to={`/deviceCategory/${params.getValue(params.id, "id")}`}>
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>

            <IconButton
              color="secondary"
              onClick={() =>
                deleteDeviceCategoryHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </IconButton>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  deviceCategorys &&
    deviceCategorys.forEach((deviceCategory) => {
      rows.push({
        serial: count++,
        id: deviceCategory._id,
        name: deviceCategory.name,
        status: deviceCategory.status,
      });
    });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="card card-light">
              <div className="card-header">
                <h3 className="card-title">List of device category</h3>
              </div>
              {/* /.card-header */}
              <div className="card-body">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="deviceCategoryListTable"
                  autoHeight
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeviceCategoryList;
