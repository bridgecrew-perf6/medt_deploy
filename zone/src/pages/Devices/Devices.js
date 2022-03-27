import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { IconButton, Link } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { DataGrid } from "@material-ui/data-grid";
import { DELETE_DEVICE_RESET } from "../../constants/deviceConstants";
import ContentHeader from "../../components/ContentHeader";
import MetaData from "../../layout/MetaData";
import {
  getAdminDevices,
  clearErrors,
  deleteDevice,
  getAllDevicesByZone,
} from "../../actions/deviceAction";
import Loader from "../../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import { getAllDrugsByZone } from "../../actions/drugAction";

export default function Devices() {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const { loading, error, devices } = useSelector((state) => state.devices);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.device
  );

  const deleteDeviceHandler = (id) => {
    dispatch(deleteDevice(id));
  };
const zoneId = employee.zoneId;
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
      alert.success("Device Deleted Successfully");
      // history.push("/admin/dashboard");
      dispatch({ type: DELETE_DEVICE_RESET });
    }
    dispatch(getAllDevicesByZone(zoneId));
  }, [dispatch, error, alert, deleteError, isDeleted]);
  let count = 1;

  // Data Grid

  const columns = [
    { field: "serial", headerName: "#", minWidth: 90, flex: 0.2 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 200,
      flex: 0.5,
      hide: true,
    },
    {
      field: "keywords",
      headerName: "Keywords",
      minWidth: 200,
      flex: 0.5,
      // hide: true,
    },
    {
      field: "description",
      headerName: "Description",
      minWidth: 200,
      flex: 0.5,
      // hide: true,
    },
    {
      field: "actions",
      flex: 0.5,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              onClick={() =>
                navigate(`/device/${params.getValue(params.id, "id")}`)
              }
            >
              <IconButton color="primary">
                <EditIcon />
              </IconButton>
            </Link>
          </>
        );
      },
    },
  ];

  const rows = [];

  devices &&
    devices.forEach((device) => {
      rows.push({
        serial: count++,
        id: device._id,
        name: device.name,
        description: device.description,
        category: device.category,
        keywords: device.keywords,
        // price: device.price,
      });
    });

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Device" />
          <div className="content-wrapper">
            <ContentHeader title="Device" />
            <section className="content">
              <div className="container-fluid">
                <div classname="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h3 className="card-title">Device Details</h3>
                      </div>
                      {/* /.card-header */}
                      <div className="card-body">
                        <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={10}
                          disableSelectionOnClick
                          className="deviceListTable"
                          autoHeight
                        />
                      </div>
                      {/* /.card-body */}
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
